import { AI_TOOL_IDS } from './tools.js';
import { getAiStatus, runAiTool } from './gateway.js';

export async function handleAiStatus(_request, response) {
  return response.json(getAiStatus());
}

export async function handleAiToolsList(_request, response) {
  return response.json({
    ok: true,
    tools: AI_TOOL_IDS,
  });
}

export async function handleAiRun(request, response, toolId) {
  if (request.method && request.method !== 'POST') {
    response.setHeader?.('Allow', 'POST');
    return response.status(405).json({ ok: false, message: 'Method not allowed.' });
  }

  try {
    const body = request.body ?? {};
    const result = await runAiTool(toolId, body.context ?? body);
    return response.json(result);
  } catch (error) {
    const status = error.status || 500;
    if (status >= 500) {
      console.error(`AI tool ${toolId} failed:`, error);
    }
    return response.status(status).json({
      ok: false,
      message: error.message || 'Unable to run AI tool right now.',
    });
  }
}
