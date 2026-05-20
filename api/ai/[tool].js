import { handleAiRun } from '../../server/ai/handler.js';

export default function handler(request, response) {
  const tool = request.query?.tool;
  return handleAiRun(request, response, tool);
}
