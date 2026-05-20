(function initEdvieyeAiModule() {
  const AI_TOOLS = [
    {
      id: 'task-prioritize',
      icon: 'TP',
      title: 'Task Prioritization',
      desc: 'Rank daily tasks by urgency and impact.',
    },
    {
      id: 'schedule-reminders',
      icon: 'SR',
      title: 'Schedule Reminders',
      desc: 'Smart alerts from timetable and exams.',
    },
    {
      id: 'performance-insights',
      icon: 'PI',
      title: 'Performance Insights',
      desc: 'Your teaching trends and action plan.',
    },
    {
      id: 'workload-analysis',
      icon: 'WA',
      title: 'Workload Analysis',
      desc: 'Balance periods, duties, and burnout risk.',
    },
    {
      id: 'class-performance',
      icon: 'CP',
      title: 'Class Performance',
      desc: 'Class insights and at-risk interventions.',
    },
    {
      id: 'lesson-plan',
      icon: 'LP',
      title: 'Lesson Plan Generator',
      desc: 'Full structured lesson plans in minutes.',
    },
    {
      id: 'teaching-suggestions',
      icon: 'TS',
      title: 'Teaching Suggestions',
      desc: 'Activities and differentiation ideas.',
    },
  ];

  const FIELD_DEFS = {
    'task-prioritize': [
      { key: 'teacherName', label: 'Teacher name', placeholder: 'e.g. Priya Sharma' },
      {
        key: 'tasks',
        label: 'Tasks (one per line)',
        placeholder: 'Grade 8 math papers — due Friday\nParent meeting — tomorrow',
        type: 'textarea',
        required: true,
      },
      { key: 'hoursAvailable', label: 'Hours available today', placeholder: '4' },
    ],
    'schedule-reminders': [
      { key: 'schoolName', label: 'School name', placeholder: 'Future Public School' },
      {
        key: 'schedule',
        label: 'Schedule / events',
        placeholder: 'Mon 9am Class 10 Maths\nFri Unit test Grade 9',
        type: 'textarea',
        required: true,
      },
      { key: 'reminderPreference', label: 'Reminder preference', placeholder: 'WhatsApp + 1 day before' },
    ],
    'performance-insights': [
      { key: 'teacherName', label: 'Teacher name', placeholder: 'e.g. Priya Sharma' },
      { key: 'subjects', label: 'Subjects taught', placeholder: 'Mathematics, Science' },
      {
        key: 'metrics',
        label: 'Recent metrics',
        placeholder: 'Avg grade 78%, attendance 94%, 3 at-risk students',
        type: 'textarea',
        required: true,
      },
    ],
    'workload-analysis': [
      { key: 'teacherName', label: 'Teacher name', placeholder: 'e.g. Priya Sharma' },
      {
        key: 'weeklyLoad',
        label: 'Weekly load',
        placeholder: '28 periods, 4 committees, 2 exam duties',
        type: 'textarea',
        required: true,
      },
      { key: 'constraints', label: 'Constraints', placeholder: 'Cannot work Saturdays' },
    ],
    'class-performance': [
      { key: 'className', label: 'Class', placeholder: 'Grade 8 — Section A', required: true },
      { key: 'subject', label: 'Subject', placeholder: 'Mathematics' },
      {
        key: 'classData',
        label: 'Class data',
        placeholder: 'Avg 72%, 5 below 50%, weak topic: algebra',
        type: 'textarea',
        required: true,
      },
    ],
    'lesson-plan': [
      { key: 'subject', label: 'Subject', placeholder: 'Science', required: true },
      { key: 'topic', label: 'Topic', placeholder: 'Photosynthesis', required: true },
      { key: 'grade', label: 'Grade / class', placeholder: 'Grade 7' },
      { key: 'duration', label: 'Duration (minutes)', placeholder: '45' },
      {
        key: 'objectives',
        label: 'Learning objectives (optional)',
        placeholder: 'Understand chlorophyll role',
        type: 'textarea',
      },
    ],
    'teaching-suggestions': [
      { key: 'subject', label: 'Subject', placeholder: 'English' },
      { key: 'topic', label: 'Topic', placeholder: 'Essay writing', required: true },
      {
        key: 'classProfile',
        label: 'Class profile',
        placeholder: 'Mixed ability, 35 students, 40% ESL',
        type: 'textarea',
        required: true,
      },
    ],
  };

  const moduleSec = document.getElementById('ai-module');
  const hubEl = document.getElementById('aiHub');
  const workspaceEl = document.getElementById('aiWorkspace');
  const toolTitleEl = document.getElementById('aiToolTitle');
  const toolDescEl = document.getElementById('aiToolDesc');
  const formEl = document.getElementById('aiToolForm');
  const resultEl = document.getElementById('aiResult');
  const statusEl = document.getElementById('aiEngineStatus');
  const etnaEl = document.getElementById('aiEtnaStatus');
  const backBtn = document.getElementById('aiBackBtn');
  const runBtn = document.getElementById('aiRunBtn');

  if (!moduleSec || !hubEl || !workspaceEl || !formEl) return;

  let activeTool = null;

  function openModule() {
    moduleSec.classList.add('is-open');
    moduleSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    showHub();
    loadStatus();
  }

  function showHub() {
    activeTool = null;
    hubEl.hidden = false;
    workspaceEl.hidden = true;
  }

  function showWorkspace(toolId) {
    const tool = AI_TOOLS.find((item) => item.id === toolId);
    if (!tool) return;
    activeTool = toolId;
    hubEl.hidden = true;
    workspaceEl.hidden = false;
    toolTitleEl.textContent = tool.title;
    toolDescEl.textContent = tool.desc;
    resultEl.innerHTML = '';
    resultEl.dataset.state = '';
    buildForm(toolId);
  }

  function buildForm(toolId) {
    const fields = FIELD_DEFS[toolId] || [];
    formEl.innerHTML = fields
      .map((field) => {
        const inputTag =
          field.type === 'textarea'
            ? `<textarea name="${field.key}" rows="4" placeholder="${field.placeholder || ''}" ${field.required ? 'required' : ''}></textarea>`
            : `<input name="${field.key}" type="text" placeholder="${field.placeholder || ''}" ${field.required ? 'required' : ''}>`;
        return `<label class="ai-field"><span>${field.label}</span>${inputTag}</label>`;
      })
      .join('');
  }

  function renderMarkdown(text) {
    const escaped = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    return escaped
      .replace(/^## (.+)$/gm, '<h4>$1</h4>')
      .replace(/^### (.+)$/gm, '<h5>$1</h5>')
      .replace(/^\d+\.\s+\*\*(.+?)\*\*/gm, '<p><strong>$1</strong></p>')
      .replace(/^\-\s+\*\*(.+?)\*\*/gm, '<p><strong>$1</strong></p>')
      .replace(/^\-\s+\[(.+?)\]/gm, '<p class="ai-check">☐ $1</p>')
      .replace(/^\-\s+(.+)$/gm, '<li>$1</li>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .split('\n')
      .map((line) => {
        if (line.startsWith('<h') || line.startsWith('<p') || line.startsWith('<li')) return line;
        if (!line.trim()) return '';
        return `<p>${line}</p>`;
      })
      .join('');
  }

  async function loadStatus() {
    try {
      const response = await fetch('/api/ai/status');
      const data = await response.json();
      if (!statusEl) return;
      statusEl.textContent =
        data.mode === 'live'
          ? `AI LIVE · ${data.model}`
          : 'AI DEMO MODE · add OPENAI_API_KEY for live';
      statusEl.dataset.mode = data.mode || 'demo';
      if (etnaEl) {
        etnaEl.textContent = data.etnaIntegrated
          ? 'ETNA · INTEGRATED'
          : 'ETNA · READY (set ETNA_API_URL)';
        etnaEl.dataset.state = data.etnaIntegrated ? 'on' : 'off';
      }
    } catch {
      if (statusEl) statusEl.textContent = 'AI OFFLINE · start server (npm run dev)';
    }
  }

  async function runTool() {
    if (!activeTool) return;
    const formData = new FormData(formEl);
    const context = {};
    formData.forEach((value, key) => {
      context[key] = String(value || '').trim();
    });

    resultEl.dataset.state = 'loading';
    resultEl.innerHTML = '<p class="ai-loading">Generating insights…</p>';
    runBtn.disabled = true;
    runBtn.textContent = 'RUNNING AI…';

    try {
      const response = await fetch(`/api/ai/${activeTool}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(context),
      });
      const data = await response.json();
      if (!response.ok || data.ok === false) {
        throw new Error(data.message || 'AI request failed.');
      }
      resultEl.dataset.state = 'success';
      const meta = `<div class="ai-meta">${data.mode === 'live' ? 'LIVE' : 'DEMO'} · ${data.latencyMs || 0}ms · ${data.tool}</div>`;
      resultEl.innerHTML = meta + `<div class="ai-result-body">${renderMarkdown(data.content || '')}</div>`;
      if (etnaEl && data.etna) {
        etnaEl.textContent =
          data.etna.integrated && data.etna.status === 'synced'
            ? 'ETNA · SYNCED'
            : data.etna.integrated
              ? 'ETNA · SYNC ERROR'
              : etnaEl.textContent;
      }
    } catch (error) {
      resultEl.dataset.state = 'error';
      resultEl.innerHTML = `<p class="ai-error">${error.message || 'Unable to run AI.'}</p>`;
    } finally {
      runBtn.disabled = false;
      runBtn.textContent = 'GENERATE WITH AI';
    }
  }

  hubEl.innerHTML = AI_TOOLS.map(
    (tool) => `
    <button type="button" class="ai-tool-card" data-tool="${tool.id}">
      <div class="ai-tool-icon">${tool.icon}</div>
      <h3>${tool.title}</h3>
      <p>${tool.desc}</p>
      <span class="ai-tool-go">OPEN →</span>
    </button>
  `,
  ).join('');

  hubEl.addEventListener('click', (event) => {
    const card = event.target.closest('[data-tool]');
    if (!card) return;
    showWorkspace(card.dataset.tool);
  });

  backBtn.addEventListener('click', showHub);
  runBtn.addEventListener('click', runTool);

  document.getElementById('openAiModule')?.addEventListener('click', openModule);
  document.getElementById('navAiModule')?.addEventListener('click', (event) => {
    event.preventDefault();
    openModule();
  });

  document.querySelectorAll('[data-open-ai]').forEach((el) => {
    el.addEventListener('click', (event) => {
      event.preventDefault();
      openModule();
    });
  });

  loadStatus();

  if (window.location.hash === '#ai-module') {
    openModule();
  }
  window.addEventListener('hashchange', () => {
    if (window.location.hash === '#ai-module') openModule();
  });
})();
