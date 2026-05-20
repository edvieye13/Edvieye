import { buildSystemPrompt, buildUserPrompt, getTool } from './tools.js';

const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';

export function getAiStatus() {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  const model = process.env.OPENAI_MODEL?.trim() || 'gpt-4o-mini';
  const etnaConfigured = Boolean(process.env.ETNA_API_URL?.trim());

  return {
    ok: true,
    mode: apiKey ? 'live' : 'demo',
    model: apiKey ? model : 'edvieye-demo',
    etnaIntegrated: etnaConfigured,
    message: apiKey
      ? 'AI is connected. Responses use your OpenAI API key.'
      : 'Running in demo mode. Add OPENAI_API_KEY to .env for live AI.',
  };
}

function demoResponse(toolId, context) {
  const teacher = context.teacherName || 'Teacher';
  const school = context.schoolName || 'Your school';

  const demos = {
    'task-prioritize': `## Priority Order
1. **Parent meeting — tomorrow** — time-sensitive communication
2. **Grade 8 math papers — due Friday** — academic deadline
3. **Prepare science lab** — can batch after meetings

## Why This Order
Meetings affect stakeholder trust; grading affects report timelines; lab prep has more flexible prep windows if materials are ready.

## Suggested Time Blocks
- **Morning (90 min):** Parent meeting prep + meeting
- **Midday (2 hrs):** Grading block (focus mode)
- **Afternoon (60 min):** Lab setup checklist`,

    'schedule-reminders': `## Upcoming Reminders
- **Mon 8:30 AM** — Class 10 Maths (${school}) — prep slides tonight
- **Wed 1:30 PM** — Staff meeting — submit agenda items Tue
- **Fri 9:00 AM** — Grade 9 unit test — invigilation + answer keys ready Thu

## Suggested Channels
- WhatsApp to self: night-before class alerts
- Email: staff meeting 24h prior
- ERP notification: exam duty Fri

## Prep Checklist
- [ ] Print unit test papers by Thursday
- [ ] Confirm lab materials for Monday`,

    'performance-insights': `## Key Insights
${teacher} is maintaining strong attendance delivery (94%) with moderate grade outcomes (78% avg).

## Strengths
- Consistent attendance engagement
- Stable class participation

## Areas to Improve
- Close gap for **3 at-risk students** with targeted remediation
- Raise average grade toward 82%+ with weekly formative checks

## 7-Day Action Plan
1. Identify 3 at-risk learners by name in ERP
2. Run 15-min doubt session twice this week
3. Add one low-stakes quiz per subject`,

    'workload-analysis': `## Load Score
**7.5 / 10** — elevated load, manageable short-term with boundaries

## Risk Factors
- 28 teaching periods near full capacity
- 4 committees add meeting overhead
- 2 exam duties increase peak-week stress

## Rebalance Suggestions
- Delegate one committee report template to co-teacher
- Block **2 non-teaching periods** for grading only
- Move non-urgent admin tasks off Saturday (per your constraint)

## This Week Focus
Protect Wed/Thu afternoons for exam duty prep; defer optional meetings.`,

    'class-performance': `## Class Summary
**${context.className || 'Class'}** — average **72%**, attendance **91%**. Algebra is the primary weak strand.

## At-Risk Signals
- **5 students below 50%** need weekly monitoring
- Declining trend likely if algebra gap not addressed before next unit

## Topic Gaps
- Linear equations
- Word-problem translation

## Intervention Plan
1. 20-min daily warm-up (3 algebra questions)
2. Peer tutoring pairs for bottom quartile
3. Parent SMS for students below 50% with improvement plan`,

    'lesson-plan': `## Lesson Overview
**Subject:** ${context.subject || 'Science'} | **Topic:** ${context.topic || 'Topic'} | **Grade:** ${context.grade || '7'} | **Duration:** ${context.duration || '45'} min

## Materials
Chart paper, leaf samples, flashlight, worksheet

## Introduction (5 min)
Ask: "Why are leaves green?" Capture answers on board.

## Main Activity
- Explain photosynthesis with diagram (15 min)
- Group experiment: light vs dark leaf starch test (15 min)
- Class discussion (5 min)

## Assessment
Exit ticket: 3 short questions on inputs/outputs of photosynthesis

## Homework
Draw and label chloroplast diagram

## Differentiation
- Support: sentence starters for explanations
- Extend: research C4 plants`,

    'teaching-suggestions': `## Quick Wins
- 3-minute think-pair-share on **${context.topic || 'topic'}**
- Show one strong exemplar essay paragraph

## Classroom Activities
- Gallery walk of introduction paragraphs
- Peer review with rubric (2 stars + 1 wish)

## Differentiation
- ESL: vocabulary bank + sentence frames
- Advanced: rhetorical device challenge

## Formative Checks
- Exit slip: thesis clarity score 1-5
- Mini conference with 5 students daily`,
  };

  return demos[toolId] || '## Edvieye AI\nDemo response generated. Add OPENAI_API_KEY for live output.';
}

async function callOpenAI(toolId, context) {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) {
    return { content: demoResponse(toolId, context), mode: 'demo' };
  }

  const model = process.env.OPENAI_MODEL?.trim() || 'gpt-4o-mini';
  const response = await fetch(OPENAI_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      temperature: 0.6,
      max_tokens: 1400,
      messages: [
        { role: 'system', content: buildSystemPrompt(toolId) },
        { role: 'user', content: buildUserPrompt(toolId, context) },
      ],
    }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = data?.error?.message || `OpenAI request failed (${response.status})`;
    const error = new Error(message);
    error.status = response.status >= 500 ? 502 : 400;
    throw error;
  }

  const content = data?.choices?.[0]?.message?.content?.trim();
  if (!content) {
    const error = new Error('AI returned an empty response.');
    error.status = 502;
    throw error;
  }

  return { content, mode: 'live', model };
}

export async function runAiTool(toolId, context = {}) {
  const tool = getTool(toolId);
  if (!tool) {
    const error = new Error('Unknown AI tool.');
    error.status = 404;
    throw error;
  }

  const required = tool.fields.filter((field) => field.required);
  for (const field of required) {
    if (!String(context[field.key] || '').trim()) {
      const error = new Error(`${field.label} is required.`);
      error.status = 400;
      throw error;
    }
  }

  const startedAt = Date.now();
  const result = await callOpenAI(toolId, context);
  const etnaPayload = await syncEtna(toolId, context, result.content);

  return {
    ok: true,
    tool: toolId,
    title: tool.title,
    mode: result.mode,
    model: result.model || getAiStatus().model,
    content: result.content,
    etna: etnaPayload,
    latencyMs: Date.now() - startedAt,
    generatedAt: new Date().toISOString(),
  };
}

async function syncEtna(toolId, context, content) {
  const etnaUrl = process.env.ETNA_API_URL?.trim();
  if (!etnaUrl) {
    return { integrated: false, status: 'not_configured' };
  }

  try {
    const response = await fetch(etnaUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        source: 'edvieye-ai',
        tool: toolId,
        context,
        summary: content.slice(0, 500),
        timestamp: new Date().toISOString(),
      }),
    });

    return {
      integrated: true,
      status: response.ok ? 'synced' : 'error',
      code: response.status,
    };
  } catch {
    return { integrated: true, status: 'unreachable' };
  }
}
