import nodemailer from 'nodemailer';

const defaultDemoRecipientEmail = 'info@edvieye.com';

function getDemoRecipientEmail() {
  return process.env.DEMO_RECIPIENT_EMAIL?.trim() || defaultDemoRecipientEmail;
}

function requireEnv(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing email setting: ${name}`);
  }

  return value;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function createTransporter() {
  const port = Number(process.env.SMTP_PORT || 587);

  return nodemailer.createTransport({
    host: requireEnv('SMTP_HOST'),
    port,
    secure: port === 465,
    auth: {
      user: requireEnv('SMTP_USER'),
      pass: requireEnv('SMTP_PASS'),
    },
  });
}

export function isMailerConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

export async function sendDemoRequestEmail({ name, email, organization }) {
  const transporter = createTransporter();
  const fromEmail = process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER;
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeOrganization = escapeHtml(organization);

  return transporter.sendMail({
    from: `"Edvieye Website" <${fromEmail}>`,
    to: getDemoRecipientEmail(),
    replyTo: email,
    subject: `New demo request from ${name}`,
    text: [
      'New Edvieye demo request',
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      `Organization: ${organization}`,
    ].join('\n'),
    html: `
      <h2>New Edvieye demo request</h2>
      <p><strong>Name:</strong> ${safeName}</p>
      <p><strong>Email:</strong> ${safeEmail}</p>
      <p><strong>Organization:</strong> ${safeOrganization}</p>
    `,
  });
}
