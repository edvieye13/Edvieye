export const AI_TOOLS = {
  'task-prioritize': {
    id: 'task-prioritize',
    title: 'Task Prioritization',
    description: 'Rank tasks by urgency, impact, and deadlines.',
    fields: [
      { key: 'teacherName', label: 'Teacher name', placeholder: 'e.g. Priya Sharma' },
      { key: 'tasks', label: 'Tasks (one per line)', placeholder: 'Grade 8 math papers — due Friday\nParent meeting — tomorrow\nPrepare science lab', type: 'textarea', required: true },
      { key: 'hoursAvailable', label: 'Hours available today', placeholder: '4' },
    ],
  },
  'schedule-reminders': {
    id: 'schedule-reminders',
    title: 'Schedule & Reminders',
    description: 'Smart reminders from your timetable and exam calendar.',
    fields: [
      { key: 'schoolName', label: 'School name', placeholder: 'Future Public School' },
      { key: 'schedule', label: 'Schedule / events', placeholder: 'Mon 9am Class 10 Maths\nWed 2pm Staff meeting\nFri Unit test Grade 9', type: 'textarea', required: true },
      { key: 'reminderPreference', label: 'Reminder preference', placeholder: 'WhatsApp + 1 day before' },
    ],
  },
  'performance-insights': {
    id: 'performance-insights',
    title: 'Performance Insights',
    description: 'Personal teaching performance trends and actions.',
    fields: [
      { key: 'teacherName', label: 'Teacher name', placeholder: 'e.g. Priya Sharma' },
      { key: 'subjects', label: 'Subjects taught', placeholder: 'Mathematics, Science' },
      { key: 'metrics', label: 'Recent metrics', placeholder: 'Avg grade 78%, attendance 94%, 3 at-risk students', type: 'textarea', required: true },
    ],
  },
  'workload-analysis': {
    id: 'workload-analysis',
    title: 'Workload Analysis',
    description: 'Analyze teaching load and suggest balance.',
    fields: [
      { key: 'teacherName', label: 'Teacher name', placeholder: 'e.g. Priya Sharma' },
      { key: 'weeklyLoad', label: 'Weekly load', placeholder: '28 periods, 4 committees, 2 exam duties', type: 'textarea', required: true },
      { key: 'constraints', label: 'Constraints', placeholder: 'Cannot work Saturdays' },
    ],
  },
  'class-performance': {
    id: 'class-performance',
    title: 'Class Performance',
    description: 'Class-level insights, at-risk students, and interventions.',
    fields: [
      { key: 'className', label: 'Class', placeholder: 'Grade 8 — Section A', required: true },
      { key: 'subject', label: 'Subject', placeholder: 'Mathematics' },
      { key: 'classData', label: 'Class data', placeholder: 'Avg 72%, 5 below 50%, attendance 91%, weak topic: algebra', type: 'textarea', required: true },
    ],
  },
  'lesson-plan': {
    id: 'lesson-plan',
    title: 'Lesson Plan Generator',
    description: 'Structured lesson plans aligned to your topic and duration.',
    fields: [
      { key: 'subject', label: 'Subject', placeholder: 'Science', required: true },
      { key: 'topic', label: 'Topic', placeholder: 'Photosynthesis', required: true },
      { key: 'grade', label: 'Grade / class', placeholder: 'Grade 7' },
      { key: 'duration', label: 'Duration (minutes)', placeholder: '45' },
      { key: 'objectives', label: 'Learning objectives (optional)', placeholder: 'Understand chlorophyll role', type: 'textarea' },
    ],
  },
  'teaching-suggestions': {
    id: 'teaching-suggestions',
    title: 'Teaching Suggestions',
    description: 'Activities, differentiation, and engagement ideas.',
    fields: [
      { key: 'subject', label: 'Subject', placeholder: 'English' },
      { key: 'topic', label: 'Topic', placeholder: 'Essay writing', required: true },
      { key: 'classProfile', label: 'Class profile', placeholder: 'Mixed ability, 35 students, 40% ESL', type: 'textarea', required: true },
    ],
  },
};

export const AI_TOOL_IDS = Object.keys(AI_TOOLS);

export function getTool(toolId) {
  return AI_TOOLS[toolId] ?? null;
}

export function buildSystemPrompt(toolId) {
  const base =
    'You are Edvieye AI, an expert assistant for Indian school teachers and administrators. ' +
    'Respond in clear markdown with headings and bullet lists. Be practical, concise, and actionable. ' +
    'Do not invent specific student names unless provided.';

  const prompts = {
    'task-prioritize':
      base +
      ' Prioritize the given tasks. Output: ## Priority Order (numbered), ## Why This Order, ## Suggested Time Blocks.',
    'schedule-reminders':
      base +
      ' Create a reminder plan. Output: ## Upcoming Reminders (table-like bullets with date/time), ## Suggested Channels, ## Prep Checklist.',
    'performance-insights':
      base +
      ' Analyze teacher performance metrics. Output: ## Key Insights, ## Strengths, ## Areas to Improve, ## 7-Day Action Plan.',
    'workload-analysis':
      base +
      ' Analyze workload and burnout risk. Output: ## Load Score (1-10), ## Risk Factors, ## Rebalance Suggestions, ## This Week Focus.',
    'class-performance':
      base +
      ' Analyze class performance. Output: ## Class Summary, ## At-Risk Signals, ## Topic Gaps, ## Intervention Plan.',
    'lesson-plan':
      base +
      ' Generate a complete lesson plan. Output: ## Lesson Overview, ## Materials, ## Introduction (5 min), ## Main Activity, ## Assessment, ## Homework, ## Differentiation.',
    'teaching-suggestions':
      base +
      ' Suggest teaching strategies. Output: ## Quick Wins, ## Classroom Activities, ## Differentiation, ## Formative Checks.',
  };

  return prompts[toolId] || base;
}

export function buildUserPrompt(toolId, context = {}) {
  const lines = Object.entries(context)
    .filter(([, value]) => String(value || '').trim())
    .map(([key, value]) => `${key}: ${String(value).trim()}`);

  return `Tool: ${toolId}\nContext:\n${lines.join('\n')}`;
}
