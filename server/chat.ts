import type { IncomingMessage, ServerResponse } from 'node:http';
import {
  parseChatRequest,
  rateLimited,
  sseFrame,
  streamChat,
  ChatRequestError,
  SSE_HEADERS,
  type ChatEnv,
} from './chatCore';

export type { ChatEnv } from './chatCore';

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk;
      if (raw.length > 200_000) reject(new Error('payload too large'));
    });
    req.on('end', () => resolve(raw));
    req.on('error', reject);
  });
}

/**
 * Node adapter for the Vite dev server. All of the actual work lives in
 * chatCore, which the Netlify function runs too — see netlify/functions/chat.mts.
 */
export async function handleChat(req: IncomingMessage, res: ServerResponse, env: ChatEnv) {
  const ip = (req.socket.remoteAddress ?? 'unknown').replace(/^::ffff:/, '');

  const fail = (status: number, message: string) => {
    res.writeHead(status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: message }));
  };

  if (req.method !== 'POST') return fail(405, 'Method not allowed');
  if (rateLimited(ip)) return fail(429, 'Too many messages. Please try again in a few minutes.');

  let parsed;
  try {
    parsed = parseChatRequest(await readBody(req));
  } catch (error) {
    const status = error instanceof ChatRequestError ? error.status : 400;
    return fail(status, error instanceof Error ? error.message : 'Invalid request');
  }

  res.writeHead(200, SSE_HEADERS);

  const controller = new AbortController();
  req.on('close', () => controller.abort());

  try {
    for await (const event of streamChat({ ...parsed, env, signal: controller.signal })) {
      res.write(sseFrame(event));
    }
  } finally {
    res.end();
  }
}
