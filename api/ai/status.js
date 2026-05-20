import { getAiStatus } from '../../server/ai/gateway.js';

export default function handler(_request, response) {
  return response.status(200).json(getAiStatus());
}
