const formSubmitEndpoint = 'https://formsubmit.co/ajax/info@edvieye.com';
const formSubmitUrl = 'https://edvieye.com/#contact';

function buildFormSubmitPayload(payload) {
  return new URLSearchParams({
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    organization: payload.organization,
    _subject: `New demo request from ${payload.name}`,
    _template: 'table',
    _url: formSubmitUrl,
  });
}

async function saveContactLead(payload) {
  return fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
}

export async function submitContactLead(payload) {
  const response = await fetch(formSubmitEndpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: buildFormSubmitPayload(payload).toString(),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok || data.success === false) {
    throw new Error(data.message || 'Unable to send your request right now.');
  }

  try {
    await saveContactLead(payload);
  } catch {
    // Keep the user flow successful if local lead storage is temporarily unavailable.
  }

  return {
    ok: true,
    message: data.message || 'Thanks! Your demo request has been received.',
  };
}

export async function loginAdmin(password) {
  const response = await fetch('/api/admin/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'Unable to login right now.');
  }

  return data;
}

export async function fetchAdminLeads(token) {
  const response = await fetch('/api/admin/leads', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'Unable to load demo requests right now.');
  }

  return data;
}
