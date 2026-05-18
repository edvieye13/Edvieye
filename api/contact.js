import { createContactLead } from '../server/contact.js';

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ ok: false, message: 'Method not allowed.' });
  }

  try {
    const skipNotificationHeader = request.headers['x-skip-email-notification'];
    const { lead, notification } = await createContactLead(request.body, {
      sendNotification: skipNotificationHeader === 'true' ? false : true,
    });

    return response.status(201).json({
      ok: true,
      message: 'Thanks! Your demo request has been received.',
      lead,
      notification,
    });
  } catch (error) {
    if (error.status === 400) {
      return response.status(400).json({
        ok: false,
        message: error.message,
      });
    }

    console.error('Unable to submit demo request:', error);

    return response.status(500).json({
      ok: false,
      message: 'Unable to submit your request right now.',
    });
  }
}
