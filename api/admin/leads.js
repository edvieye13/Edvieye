import { verifyAdminToken } from '../../server/adminAuth.js';
import { getLeads } from '../../server/storage.js';

export default async function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    return response.status(405).json({ ok: false, message: 'Method not allowed.' });
  }

  const header = request.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';

  if (!verifyAdminToken(token)) {
    return response.status(401).json({
      ok: false,
      message: 'Please login again.',
    });
  }

  try {
    const leads = await getLeads();

    return response.json({
      leads,
      total: leads.length,
    });
  } catch (error) {
    console.error('Unable to load admin demo requests:', error);

    return response.status(500).json({
      ok: false,
      message: 'Unable to load demo requests right now.',
    });
  }
}
