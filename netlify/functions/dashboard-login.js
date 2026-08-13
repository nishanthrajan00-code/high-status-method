// HSM — verifies the dashboard password and, on success, sets a signed
// HttpOnly cookie that the dashboard-gate edge function checks on every
// request to /dashboard.html and /.netlify/functions/dashboard-data.
//
// Required environment variables:
//   DASHBOARD_PASSWORD      - the password visitors must enter
//   DASHBOARD_COOKIE_SECRET - random secret used to sign the auth cookie
//
// Cookie format: "<expiryMs>.<hmac-sha256-hex-of-expiryMs>"
// No session store needed — the signature itself proves validity.

const crypto = require('crypto');

const COOKIE_NAME = 'hsm_dash_auth';
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

function sign(payload, secret) {
  return crypto.createHmac('sha256', secret).update(payload).digest('hex');
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  let password;
  try {
    ({ password } = JSON.parse(event.body || '{}'));
  } catch (e) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Bad request' }) };
  }

  const correctPassword = process.env.DASHBOARD_PASSWORD;
  const secret = process.env.DASHBOARD_COOKIE_SECRET;
  if (!correctPassword || !secret) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Dashboard auth not configured' }),
    };
  }

  if (typeof password !== 'string' || password !== correctPassword) {
    return { statusCode: 401, body: JSON.stringify({ error: 'Incorrect password' }) };
  }

  const expiry = Date.now() + MAX_AGE_SECONDS * 1000;
  const payload = String(expiry);
  const token = payload + '.' + sign(payload, secret);

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie':
        COOKIE_NAME + '=' + token +
        '; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=' + MAX_AGE_SECONDS,
    },
    body: JSON.stringify({ ok: true }),
  };
};
