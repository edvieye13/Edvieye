import { addLead } from '../server/storage.js';

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ ok: false, message: 'Method not allowed.' });
  }

  const { name = '', email = '', organization = '' } = request.body ?? {};
  const lead = {
    name: name.trim(),
    email: email.trim(),
    organization: organization.trim(),
  };

  if (!lead.name || !lead.email || !lead.organization) {
    return response.status(400).json({
      ok: false,
      message: 'Please fill in all fields.',
    });
  }

  try {
    const savedLead = await addLead(lead);

    return response.status(201).json({
      ok: true,
      message: 'Thanks! Your demo request has been received.',
      lead: savedLead,
    });
  } catch (error) {
    console.error('Unable to submit demo request:', error);

    return response.status(500).json({
      ok: false,
      message: 'Unable to submit your request right now.',
    });
  }
}
