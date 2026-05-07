import { randomUUID } from 'node:crypto';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = process.env.VERCEL ? os.tmpdir() : path.join(__dirname, 'data');
const leadsFile = path.join(dataDir, 'leads.json');
const kvUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const kvToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const kvKey = 'edvieye:demo-leads';

async function readKvLeads() {
  const response = await fetch(kvUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${kvToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(['GET', kvKey]),
  });

  if (!response.ok) {
    throw new Error('Unable to read demo requests from KV.');
  }

  const data = await response.json();
  return data.result ? JSON.parse(data.result) : [];
}

async function writeKvLeads(leads) {
  const response = await fetch(kvUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${kvToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(['SET', kvKey, JSON.stringify(leads)]),
  });

  if (!response.ok) {
    throw new Error('Unable to save demo request to KV.');
  }
}

function hasKvStore() {
  return Boolean(kvUrl && kvToken);
}

async function ensureStore() {
  await fs.mkdir(dataDir, { recursive: true });

  try {
    await fs.access(leadsFile);
  } catch {
    await fs.writeFile(leadsFile, '[]\n', 'utf8');
  }
}

async function readLeads() {
  if (hasKvStore()) {
    return readKvLeads();
  }

  await ensureStore();
  const raw = await fs.readFile(leadsFile, 'utf8');

  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function writeLeads(leads) {
  if (hasKvStore()) {
    await writeKvLeads(leads);
    return;
  }

  await ensureStore();
  await fs.writeFile(leadsFile, `${JSON.stringify(leads, null, 2)}\n`, 'utf8');
}

export async function getLeads() {
  return readLeads();
}

export async function addLead(payload) {
  const leads = await readLeads();
  const lead = {
    id: randomUUID(),
    ...payload,
    createdAt: new Date().toISOString(),
  };

  leads.unshift(lead);
  await writeLeads(leads);

  return lead;
}

export async function getLeadStats() {
  const leads = await readLeads();
  return {
    totalLeads: leads.length,
    lastSubmissionAt: leads[0]?.createdAt ?? null,
  };
}
