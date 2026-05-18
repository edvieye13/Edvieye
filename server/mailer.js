import nodemailer from 'nodemailer';

const defaultMailTo = 'info@edvieye.com';
const defaultPublicUrl = 'https://edvieye.com/#contact';

let transporter;

function asBoolean(value, fallback = false) {
  if (value == null || value === '') {
    return fallback;
  }

  return ['1', 'true', 'yes', 'on'].includes(String(value).trim().toLowerCase());
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function buildTransportConfig() {
  const service = process.env.SMTP_SERVICE?.trim();
  const host = process.env.SMTP_HOST?.trim();
  const port = Number(process.env.SMTP_PORT || 587);
  const secure = asBoolean(process.env.SMTP_SECURE, port === 465);
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  const connectionTimeout = Number(process.env.SMTP_CONNECTION_TIMEOUT || 5000);
  const greetingTimeout = Number(process.env.SMTP_GREETING_TIMEOUT || 5000);
  const socketTimeout = Number(process.env.SMTP_SOCKET_TIMEOUT || 10000);

  if (!(service || host) || !user || !pass) {
    return null;
  }

  return {
    service: service || undefined,
    host: service ? undefined : host,
    port,
    secure,
    connectionTimeout,
    greetingTimeout,
    socketTimeout,
    auth: {
      user,
      pass,
    },
  };
}

function getTransporter() {
  if (!transporter) {
    const config = buildTransportConfig();

    if (!config) {
      return null;
    }

    transporter = nodemailer.createTransport(config);
  }

  return transporter;
}

function getMailTo() {
  return process.env.MAIL_TO?.trim() || defaultMailTo;
}

function getFormSubmitUrl() {
  return (
    process.env.PUBLIC_SITE_URL?.trim() ||
    process.env.FORMSUBMIT_URL?.trim() ||
    defaultPublicUrl
  );
}

async function sendDemoNotificationByFormSubmit(lead) {
  const to = getMailTo();
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: new URLSearchParams({
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        organization: lead.organization,
        _subject: `New demo request from ${lead.name}`,
        _template: 'table',
        _url: getFormSubmitUrl(),
      }).toString(),
      signal: controller.signal,
    });
    const data = await response.json().catch(() => ({}));

    if (!response.ok || data.success === false) {
      throw new Error(data.message || 'Unable to send the FormSubmit email notification.');
    }

    return {
      enabled: true,
      sent: true,
      provider: 'formsubmit',
    };
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('FormSubmit notification timed out.');
    }

    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

export function isEmailConfigured() {
  return Boolean(buildTransportConfig());
}

export function getEmailMode() {
  return isEmailConfigured() ? 'smtp' : 'formsubmit';
}

export async function sendDemoNotificationEmail(lead) {
  const activeTransporter = getTransporter();

  if (!activeTransporter) {
    return sendDemoNotificationByFormSubmit(lead);
  }

  const to = getMailTo();
  const from =
    process.env.MAIL_FROM?.trim() ||
    process.env.SMTP_FROM?.trim() ||
    process.env.SMTP_USER?.trim() ||
    defaultMailTo;
  const bcc = process.env.MAIL_BCC?.trim() || undefined;
  const replyTo = process.env.MAIL_REPLY_TO?.trim() || lead.email;
  const submittedAt = lead.createdAt || new Date().toISOString();
  const subject = `New demo request from ${lead.name}`;
  const text = [
    'A new Edvieye demo request was submitted.',
    '',
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone}`,
    `Organization: ${lead.organization}`,
    `Submitted: ${submittedAt}`,
    `Lead ID: ${lead.id}`,
  ].join('\n');
  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0f172a;">
      <h2 style="margin-bottom:12px;">New Edvieye Demo Request</h2>
      <table style="border-collapse:collapse;width:100%;max-width:640px;">
        <tr>
          <td style="padding:8px 12px;border:1px solid #dbe4f0;font-weight:600;">Name</td>
          <td style="padding:8px 12px;border:1px solid #dbe4f0;">${escapeHtml(lead.name)}</td>
        </tr>
        <tr>
          <td style="padding:8px 12px;border:1px solid #dbe4f0;font-weight:600;">Email</td>
          <td style="padding:8px 12px;border:1px solid #dbe4f0;">${escapeHtml(lead.email)}</td>
        </tr>
        <tr>
          <td style="padding:8px 12px;border:1px solid #dbe4f0;font-weight:600;">Phone</td>
          <td style="padding:8px 12px;border:1px solid #dbe4f0;">${escapeHtml(lead.phone)}</td>
        </tr>
        <tr>
          <td style="padding:8px 12px;border:1px solid #dbe4f0;font-weight:600;">Organization</td>
          <td style="padding:8px 12px;border:1px solid #dbe4f0;">${escapeHtml(lead.organization)}</td>
        </tr>
        <tr>
          <td style="padding:8px 12px;border:1px solid #dbe4f0;font-weight:600;">Submitted</td>
          <td style="padding:8px 12px;border:1px solid #dbe4f0;">${escapeHtml(submittedAt)}</td>
        </tr>
        <tr>
          <td style="padding:8px 12px;border:1px solid #dbe4f0;font-weight:600;">Lead ID</td>
          <td style="padding:8px 12px;border:1px solid #dbe4f0;">${escapeHtml(lead.id)}</td>
        </tr>
      </table>
    </div>
  `;

  try {
    await activeTransporter.sendMail({
      to,
      from,
      bcc,
      replyTo,
      subject,
      text,
      html,
    });

    return {
      enabled: true,
      sent: true,
      provider: 'smtp',
    };
  } catch (smtpError) {
    console.error('SMTP delivery failed, falling back to FormSubmit:', smtpError);
    return sendDemoNotificationByFormSubmit(lead);
  }
}
