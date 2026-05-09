const defaultFormSubmitTarget = 'info@edvieye.com';
const defaultFormUrl = 'https://edvieye.com/#contact';

function getFormSubmitTarget() {
  return process.env.FORMSUBMIT_TARGET?.trim() || defaultFormSubmitTarget;
}

function getFormSubmitUrl() {
  return process.env.FORMSUBMIT_FORM_URL?.trim() || defaultFormUrl;
}

export async function submitDemoRequestToFormSubmit({ name, email, organization }) {
  const target = getFormSubmitTarget();
  const payload = new URLSearchParams({
    name,
    email,
    organization,
    _subject: `New demo request from ${name}`,
    _template: 'table',
    _url: getFormSubmitUrl(),
  });

  const response = await fetch(`https://formsubmit.co/ajax/${target}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: payload.toString(),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok || data.success === false) {
    throw new Error(data.message || 'Unable to forward demo request to FormSubmit.');
  }

  return data;
}
