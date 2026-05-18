const formSubmitEndpoint = 'https://formsubmit.co/ajax/info@edvieye.com';
const formSubmitUrl = 'https://edvieye.com/#contact';
const contactEndpoint = '/api/contact';

function buildRequestError(message, status) {
  const error = new Error(message);
  error.status = status;
  return error;
}

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
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(contactEndpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    const data = await response.json().catch(() => ({}));

    if (!response.ok || data.ok === false) {
      throw buildRequestError(
        data.message || 'Unable to submit your demo request right now.',
        response.status,
      );
    }

    return data;
  } catch (error) {
    if (error.name === 'AbortError') {
      throw buildRequestError('The server took too long to respond. Please try again.', 408);
    }

    throw error;
  } finally {
    window.clearTimeout(timeoutId);
  }
}

async function submitToFormSubmit(payload) {
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
    throw buildRequestError(data.message || 'Unable to send your request right now.', response.status);
  }

  return {
    ok: true,
    message: data.message || 'Thanks! Your demo request has been received.',
  };
}

export async function submitContactLead(payload) {
  try {
    return await saveContactLead(payload);
  } catch (error) {
    if (!navigator.onLine) {
      throw new Error('You appear to be offline. Please check your connection and try again.');
    }

    if (error.status && error.status < 500 && error.status !== 404 && error.status !== 408) {
      throw error;
    }

    return submitToFormSubmit(payload);
  }
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
