import { createAdminToken } from '../../server/adminAuth.js';

export default function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ ok: false, message: 'Method not allowed.' });
  }

  const { password = '' } = request.body ?? {};
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  if (password !== adminPassword) {
    return response.status(401).json({
      ok: false,
      message: 'Invalid admin password.',
    });
  }

  return response.json({
    ok: true,
    token: createAdminToken(),
  });
}
