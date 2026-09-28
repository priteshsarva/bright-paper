const API_ROOT = 'https://generativelanguage.googleapis.com/v1beta/models';

export interface GeminiPart {
  text?: string;
  thoughtSignature?: string;
  functionCall?: { name: string; args: Record<string, unknown> };
  functionResponse?: { name: string; response: Record<string, unknown> };
}

export interface GeminiContent {
  role: 'user' | 'model';
  parts: GeminiPart[];
}

export type GeminiEvent =
  | { type: 'text'; value: string }
  | { type: 'functionCall'; name: string; args: Record<string, unknown>; thoughtSignature?: string };

interface StreamOptions {
  apiKey: string;
  model: string;
  system: string;
  contents: GeminiContent[];
  tools?: unknown[];
  signal?: AbortSignal;
}

export class GeminiError extends Error {
  constructor(message: string, readonly status: number) {
    super(message);
  }
}

/** 503 and 429 are the free tier's normal weather, and 500 is usually transient. */
const RETRY_STATUSES = new Set([429, 500, 502, 503, 504]);
const RETRIES = 3;
const RETRY_BASE_MS = 700;

const sleep = (ms: number, signal?: AbortSignal) =>
  new Promise<void>((resolve, reject) => {
    const timer = setTimeout(resolve, ms);
    signal?.addEventListener('abort', () => {
      clearTimeout(timer);
      reject(new Error('aborted'));
    });
  });

/**
 * One request, retried on the statuses Google hands out when it is busy rather
 * than when we are wrong. Only the request is retried, never a stream already
 * being read — a partly delivered reply cannot be restarted without repeating
 * text the visitor has already seen.
 */
async function requestGemini(options: StreamOptions): Promise<Response> {
  const { apiKey, model, system, contents, tools, signal } = options;
  let last: GeminiError | null = null;

  for (let attempt = 0; attempt <= RETRIES; attempt++) {
    const res = await fetch(`${API_ROOT}/${model}:streamGenerateContent?alt=sse`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
      signal,
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: system }] },
        contents,
        ...(tools?.length ? { tools: [{ functionDeclarations: tools }] } : {}),
        generationConfig: { temperature: 0.6, maxOutputTokens: 1024 },
      }),
    });

    if (res.ok && res.body) return res;

    const body = (await res.text()).slice(0, 500);
    last = new GeminiError(body || res.statusText, res.status);

    if (!RETRY_STATUSES.has(res.status) || attempt === RETRIES) break;

    // 0.7s, 1.4s, 2.8s — long enough for a demand spike to pass, short enough
    // that the visitor is still waiting rather than gone.
    const wait = RETRY_BASE_MS * 2 ** attempt;
    console.warn(`[gemini] ${res.status}, retrying in ${wait}ms (attempt ${attempt + 1}/${RETRIES})`);
    await sleep(wait, signal);
  }

  throw last ?? new GeminiError('request failed', 0);
}

/**
 * Streams one Gemini turn, yielding text deltas as they arrive and any
 * function call the model emits.
 */
export async function* streamGemini(options: StreamOptions): AsyncGenerator<GeminiEvent> {
  const res = await requestGemini(options);

  const reader = res.body!.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() ?? '';

    for (const line of lines) {
      if (!line.startsWith('data:')) continue;

      const payload = line.slice(5).trim();
      if (!payload || payload === '[DONE]') continue;

      let chunk: { candidates?: { content?: { parts?: GeminiPart[] } }[] };
      try {
        chunk = JSON.parse(payload);
      } catch {
        continue; // partial frame, the next read will complete it
      }

      for (const part of chunk.candidates?.[0]?.content?.parts ?? []) {
        if (part.text) {
          yield { type: 'text', value: part.text };
        } else if (part.functionCall) {
          yield {
            type: 'functionCall',
            name: part.functionCall.name,
            args: part.functionCall.args ?? {},
            thoughtSignature: part.thoughtSignature,
          };
        }
      }
    }
  }
}
