import { createHmac, timingSafeEqual } from 'node:crypto';

const tokenMaxAgeMs = 1000 * 60 * 60 * 12;

function getSecret() {
  return process.env.ADMIN_PASSWORD || 'admin123';
}

function sign(payload) {
  return createHmac('sha256', getSecret()).update(payload).digest('hex');
}

export function createAdminToken() {
  const expiresAt = Date.now() + tokenMaxAgeMs;
  const payload = String(expiresAt);

  return `${payload}.${sign(payload)}`;
}

export function verifyAdminToken(token = '') {
  const [payload, signature] = token.split('.');

  if (!payload || !signature || Number(payload) < Date.now()) {
    return false;
  }

  const expected = sign(payload);
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);

  if (signatureBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(signatureBuffer, expectedBuffer);
}
