// HSM — private analytics dashboard data endpoint.
// Pulls GA4 (via the Data API, service-account auth) and Whop (via its REST
// API) numbers server-side and returns one combined JSON payload for the
// dashboard page to render. Nothing here is exposed to the public site —
// only this function and the dashboard page know it exists, and both will
// sit behind the password gate being added next.
//
// Required environment variables:
//   GA4_SA_EMAIL         - service account client_email (from the JSON key)
//   GA4_SA_PRIVATE_KEY   - service account private_key (from the JSON key, with literal \n's)
//   WHOP_API_KEY         - a Whop Account API key (Data pipeline / read-only role is enough)
//   WHOP_COMPANY_ID      - your Whop company id, looks like biz_xxxxxxxxxxxx
//
// Each section fails independently and reports its own error string rather
// than taking down the whole response — a missing Whop key shouldn't stop
// the GA4 numbers from showing, and vice versa.

const GA4_PROPERTY_ID = '549772158'; // HSM Website GA4 property

function b64url(input) {
  return Buffer.from(input)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

async function getGA4AccessToken() {
  const email = process.env.GA4_SA_EMAIL;
  const rawKey = process.env.GA4_SA_PRIVATE_KEY;
  if (!email || !rawKey) throw new Error('GA4 service account not configured');
  const privateKey = rawKey.replace(/\\n/g, '\n');

  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const claims = {
    iss: email,
    scope: 'https://www.googleapis.com/auth/analytics.readonly',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  };
  const unsigned = b64url(JSON.stringify(header)) + '.' + b64url(JSON.stringify(claims));

  const crypto = require('crypto');
  const signer = crypto.createSign('RSA-SHA256');
  signer.update(unsigned);
  signer.end();
  const signature = signer
    .sign(privateKey)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
  const jwt = unsigned + '.' + signature;

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'grant_type=' + encodeURIComponent('urn:ietf:params:oauth:grant-type:jwt-bearer') + '&assertion=' + jwt,
  });
  if (!res.ok) throw new Error('GA4 token exchange failed: ' + res.status + ' ' + (await res.text()));
  const data = await res.json();
  return data.access_token;
}

async function ga4RunReport(token, body) {
  const res = await fetch(
    'https://analyticsdata.googleapis.com/v1beta/properties/' + GA4_PROPERTY_ID + ':runReport',
    {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    },
  );
  if (!res.ok) throw new Error('GA4 runReport failed: ' + res.status + ' ' + (await res.text()));
  return res.json();
}

async function getGA4Data() {
  const token = await getGA4AccessToken();

  const [traffic, conversions, sources, ctas] = await Promise.all([
    ga4RunReport(token, {
      dateRanges: [{ startDate: '29daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'date' }],
      metrics: [{ name: 'activeUsers' }],
      orderBys: [{ dimension: { dimensionName: 'date' } }],
    }),
    ga4RunReport(token, {
      dateRanges: [{ startDate: '29daysAgo', endDate: 'today' }],
      metrics: [{ name: 'sessions' }, { name: 'conversions' }, { name: 'activeUsers' }],
    }),
    ga4RunReport(token, {
      dateRanges: [{ startDate: '29daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'sessionSourceMedium' }],
      metrics: [{ name: 'sessions' }],
      orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
      limit: 5,
    }),
    // Requires the 'cta_label' event-scoped custom dimension to be created
    // in GA4 Admin -> Custom definitions. Falls back gracefully if missing.
    ga4RunReport(token, {
      dateRanges: [{ startDate: '29daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'customEvent:cta_label' }],
      metrics: [{ name: 'eventCount' }],
      orderBys: [{ metric: { metricName: 'eventCount' }, desc: true }],
      limit: 6,
    }).catch((err) => ({ error: err.message })),
  ]);

  const trafficSeries = (traffic.rows || []).map((r) => ({
    date: r.dimensionValues[0].value,
    users: Number(r.metricValues[0].value),
  }));

  const convRow = (conversions.rows || [])[0];
  const sessions = convRow ? Number(convRow.metricValues[0].value) : 0;
  const purchases = convRow ? Number(convRow.metricValues[1].value) : 0;
  const activeUsers30d = convRow ? Number(convRow.metricValues[2].value) : 0;

  const topSources = (sources.rows || []).map((r) => ({
    source: r.dimensionValues[0].value,
    sessions: Number(r.metricValues[0].value),
  }));

  const topCtas = ctas.error
    ? { error: ctas.error }
    : (ctas.rows || []).map((r) => ({
        label: r.dimensionValues[0].value,
        count: Number(r.metricValues[0].value),
      }));

  return {
    activeUsers30d,
    sessions30d: sessions,
    conversions30d: purchases,
    conversionRate: sessions ? +((purchases / sessions) * 100).toFixed(2) : 0,
    trafficSeries,
    topSources,
    topCtas,
  };
}

async function whopFetch(path) {
  const apiKey = process.env.WHOP_API_KEY;
  if (!apiKey) throw new Error('Whop API key not configured');
  const res = await fetch('https://api.whop.com/api/v1' + path, {
    headers: { Authorization: 'Bearer ' + apiKey },
  });
  if (!res.ok) throw new Error('Whop API failed: ' + res.status + ' ' + (await res.text()));
  return res.json();
}

async function getWhopData() {
  const companyId = process.env.WHOP_COMPANY_ID;
  if (!companyId) throw new Error('WHOP_COMPANY_ID not configured');

  const payments = await whopFetch('/payments?company_id=' + encodeURIComponent(companyId) + '&per=10');
  const list = payments.data || payments.payments || [];

  const recentPurchases = list.slice(0, 8).map((p) => ({
    id: p.id,
    amount: p.final_amount ?? p.amount ?? null,
    currency: (p.currency || 'usd').toUpperCase(),
    createdAt: p.created_at || p.paid_at || null,
    status: p.status || 'unknown',
  }));

  const last30 = list.filter((p) => {
    if (!p.created_at) return false;
    const days = (Date.now() - new Date(p.created_at).getTime()) / 86400000;
    return days <= 30;
  });
  const revenue30d = last30.reduce((sum, p) => sum + (p.final_amount ?? p.amount ?? 0), 0);

  return { recentPurchases, revenue30d, newPayments30d: last30.length };
}

exports.handler = async () => {
  const [ga4Result, whopResult] = await Promise.allSettled([getGA4Data(), getWhopData()]);

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'private, max-age=60' },
    body: JSON.stringify({
      generatedAt: new Date().toISOString(),
      ga4: ga4Result.status === 'fulfilled' ? ga4Result.value : { error: ga4Result.reason.message },
      whop: whopResult.status === 'fulfilled' ? whopResult.value : { error: whopResult.reason.message },
    }),
  };
};
