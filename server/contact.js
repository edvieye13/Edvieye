import { addLead } from './storage.js';
import { sendDemoNotificationEmail } from './mailer.js';

export function normalizeLeadPayload(payload = {}) {
  const { name = '', email = '', phone = '', organization = '' } = payload;

  return {
    name: String(name).trim(),
    email: String(email).trim(),
    phone: String(phone).trim(),
    organization: String(organization).trim(),
  };
}

export function validateLeadPayload(lead) {
  if (!lead.name || !lead.email || !lead.phone || !lead.organization) {
    return 'Please fill in all fields.';
  }

  return '';
}

export async function createContactLead(payload, options = {}) {
  const lead = normalizeLeadPayload(payload);
  const validationError = validateLeadPayload(lead);
  const shouldSendNotification = options.sendNotification !== false;

  if (validationError) {
    const error = new Error(validationError);
    error.status = 400;
    throw error;
  }

  const savedLead = await addLead(lead);
  let notification = {
    enabled: false,
    sent: false,
    skippedReason: shouldSendNotification ? 'not_attempted' : 'skipped_by_request',
  };

  if (shouldSendNotification) {
    try {
      notification = await sendDemoNotificationEmail(savedLead);
    } catch (error) {
      notification = {
        enabled: true,
        sent: false,
        skippedReason: 'send_failed',
      };
      console.error('Unable to send demo notification email:', error);
    }
  }

  return {
    lead: savedLead,
    notification,
  };
}
