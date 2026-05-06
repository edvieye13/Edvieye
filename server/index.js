import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { addLead, getLeadStats, getLeads } from './storage.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

const app = express();
const port = Number(process.env.PORT) || 3001;

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

app.post('/api/contact', async (request, response) => {
  const { name = '', email = '', organization = '' } = request.body ?? {};

  if (!name.trim() || !email.trim() || !organization.trim()) {
    return response.status(400).json({
      ok: false,
      message: 'Please fill in all fields.',
    });
  }

  const lead = await addLead({
    name: name.trim(),
    email: email.trim(),
    organization: organization.trim(),
  });

  return response.status(201).json({
    ok: true,
    message: 'Thanks! Our team will reach out within 24 hours.',
    lead,
  });
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

