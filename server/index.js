import express from 'express';
import 'dotenv/config';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { addLead, getLeadStats, getLeads } from './storage.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

const app = express();
const port = Number(process.env.PORT) || 3001;
const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
const adminSessions = new Set();

app.use(express.json());

// Simple API health endpoint for local verification and deployment checks.
app.get('/api/health', async (_request, response) => {
  const stats = await getLeadStats();
  response.json({
    ok: true,
    service: 'edvieye-mock-api',
    totalLeads: stats.totalLeads,
    lastSubmissionAt: stats.lastSubmissionAt,
  });
});

app.get('/api/leads', async (_request, response) => {
  const leads = await getLeads();
  response.json({
    leads,
    total: leads.length,
  });
});

function requireAdmin(request, response, next) {
  const header = request.get('authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';

  if (!token || !adminSessions.has(token)) {
    return response.status(401).json({
      ok: false,
      message: 'Please login again.',
    });
  }

  return next();
}

app.post('/api/admin/login', (request, response) => {
  const { password = '' } = request.body ?? {};

  if (password !== adminPassword) {
    return response.status(401).json({
      ok: false,
      message: 'Invalid admin password.',
    });
  }

  const token = randomUUID();
  adminSessions.add(token);

  return response.json({
    ok: true,
    token,
  });
});

app.get('/api/admin/leads', requireAdmin, async (_request, response) => {
  const leads = await getLeads();

  response.json({
    leads,
    total: leads.length,
  });
});

app.post('/api/contact', async (request, response) => {
  const { name = '', email = '', phone = '', organization = '' } = request.body ?? {};
  const lead = {
    name: name.trim(),
    email: email.trim(),
    phone: phone.trim(),
    organization: organization.trim(),
  };

  if (!lead.name || !lead.email || !lead.phone || !lead.organization) {
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
});

app.use(express.static(distDir));

app.get('*', (request, response, next) => {
  if (request.path.startsWith('/api')) {
    return next();
  }

  return response.sendFile(path.join(distDir, 'index.html'), (error) => {
    if (error) {
      next();
    }
  });
});

app.listen(port, () => {
  console.log(`Edvieye mock API running on http://localhost:${port}`);
});

