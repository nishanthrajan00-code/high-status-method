// HSM — Netlify Edge Function that gates /dashboard.html and its data
// endpoint behind the signed cookie set by dashboard-login.js. Runs on
// every matching request before it reaches the static file / function.

const COOKIE_NAME = 'hsm_dash_auth';

function getCookie(request, name) {
  const header = request.headers.get('cookie') || '';
  const parts = header.split(';').map((p) => p.trim());
  for (const part of parts) {
    const eq = part.indexOf('=');
    if (eq === -1) continue;
    if (part.slice(0, eq) === name) return part.slice(eq + 1);
  }
  return null;
}

async function verify(token, secret) {
  if (!token) return false;
  const dot = token.indexOf('.');
  if (dot === -1) return false;
  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);

  const expiry = Number(payload);
  if (!expiry || expiry < Date.now()) return false;

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sigBuffer = await crypto.subtle.sign('HMAC', key, encoder.encode(payload));
  const expectedSig = Array.from(new Uint8Array(sigBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  // Constant-time-ish comparison
  if (expectedSig.length !== sig.length) return false;
  let mismatch = 0;
  for (let i = 0; i < expectedSig.length; i++) {
    mismatch |= expectedSig.charCodeAt(i) ^ sig.charCodeAt(i);
  }
  return mismatch === 0;
}

export default async (request, context) => {
  const url = new URL(request.url);
  const secret = Netlify.env.get('DASHBOARD_COOKIE_SECRET');

  if (!secret) {
    return new Response('Dashboard auth not configured', { status: 500 });
  }

  const token = getCookie(request, COOKIE_NAME);
  const valid = await verify(token, secret);

  if (valid) {
    return context.next();
  }

  if (url.pathname.startsWith('/.netlify/functions/dashboard-data')) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const next = encodeURIComponent(url.pathname + url.search);
  return Response.redirect(new URL('/dashboard-login.html?next=' + next, url), 302);
};

export const config = {
  path: ['/dashboard.html', '/.netlify/functions/dashboard-data'],
};
