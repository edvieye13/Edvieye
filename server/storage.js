import { randomUUID } from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, 'data');
const leadsFile = path.join(dataDir, 'leads.json');

async function ensureStore() {
  await fs.mkdir(dataDir, { recursive: true });

  try {
    await fs.access(leadsFile);
  } catch {
    await fs.writeFile(leadsFile, '[]\n', 'utf8');
  }
}

async function readLeads() {
  await ensureStore();
  const raw = await fs.readFile(leadsFile, 'utf8');

  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function writeLeads(leads) {
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
