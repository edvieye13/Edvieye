import { AI_TOOL_IDS } from '../../server/ai/tools.js';

export default function handler(_request, response) {
  return response.status(200).json({
    ok: true,
    tools: AI_TOOL_IDS,
  });
}
