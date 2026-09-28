import { streamGemini, GeminiError, type GeminiContent } from './gemini';
import { SYSTEM_PROMPT, LEAD_TOOL, ALREADY_SUBMITTED_NOTE } from './prompt';
import { submitLead, type LeadArgs } from './lead';

const MAX_MESSAGES = 30;
const MAX_CHARS = 2000;
const RATE_LIMIT = 40;
const RATE_WINDOW_MS = 5 * 60 * 1000;
/** Name, mobile, product, GSM, delivery city, best time to call — all six must be asked before a lead can file. */
const REQUIRED_QUESTIONS = 6;

interface ClientMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatEnv {
  apiKey: string;
  model: string;
  leadWebhookUrl: string;
}

/** What the browser receives, one per SSE frame. Mirrors ChatStreamEvent in src/utils/chatClient.ts. */
export type ChatEvent =
  | { type: 'text'; value: string }
  | { type: 'lead'; saved: boolean }
  | { type: 'done' }
  | { type: 'error'; message: string };

export const SSE_HEADERS = {
  'Content-Type': 'text/event-stream',
  'Cache-Control': 'no-cache, no-transform',
  Connection: 'keep-alive',
};

export function sseFrame(event: ChatEvent): string {
  return `data: ${JSON.stringify(event)}\n\n`;
}

/** A request the caller should reject outright, with the status to answer. */
export class ChatRequestError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = 'ChatRequestError';
  }
}

/**
 * Best-effort only. The counter lives in the process, so a serverless platform
 * that runs several instances gives each its own budget — enough to blunt a
 * single abusive browser, not a distributed flood.
 */
const hits = new Map<string, { count: number; resetAt: number }>();

export function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);

  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

function parseMessages(value: unknown): ClientMessage[] {
  if (!Array.isArray(value)) throw new Error('messages must be an array');
  if (value.length === 0) throw new Error('messages is empty');
  if (value.length > MAX_MESSAGES) throw new Error('conversation too long');

  return value.map((item) => {
    const role = (item as ClientMessage)?.role;
    const content = (item as ClientMessage)?.content;

    if (role !== 'user' && role !== 'assistant') throw new Error('invalid role');
    if (typeof content !== 'string' || !content.trim()) throw new Error('empty message');
    if (content.length > MAX_CHARS) throw new Error('message too long');

    return { role, content };
  });
}

/** Gemini requires the transcript to open with a user turn. */
function toContents(messages: ClientMessage[]): GeminiContent[] {
  const trimmed = [...messages];
  while (trimmed.length && trimmed[0].role === 'assistant') trimmed.shift();

  return trimmed.map((m) => ({
    role: m.role === 'assistant' ? ('model' as const) : ('user' as const),
    parts: [{ text: m.content }],
  }));
}

export interface ParsedChatRequest {
  contents: GeminiContent[];
  leadAlreadySubmitted: boolean;
}

export function parseChatRequest(rawBody: string): ParsedChatRequest {
  try {
    const parsed = JSON.parse(rawBody) as { messages?: unknown; leadSubmitted?: unknown };
    const contents = toContents(parseMessages(parsed.messages));
    if (contents.length === 0) throw new Error('no user message');
    return { contents, leadAlreadySubmitted: parsed.leadSubmitted === true };
  } catch (error) {
    throw new ChatRequestError(error instanceof Error ? error.message : 'Invalid request', 400);
  }
}

interface StreamChatOptions extends ParsedChatRequest {
  env: ChatEnv;
  signal: AbortSignal;
}

/**
 * The whole conversation turn, as a stream of events. Transport-free on
 * purpose: the Vite dev plugin writes these into a Node response and the
 * Netlify function writes them into a web ReadableStream, so production runs
 * exactly the code that was tested locally.
 */
export async function* streamChat({
  contents,
  leadAlreadySubmitted,
  env,
  signal,
}: StreamChatOptions): AsyncGenerator<ChatEvent> {
  // The six mandatory questions are enforced here, not in the prompt: the model
  // files a lead the moment it has the data, however firmly it is told not to.
  // Each prior assistant turn is one question asked (the greeting is stripped by
  // toContents), so the tool only appears once all six have been answered.
  const questionsAsked = contents.filter((turn) => turn.role === 'model').length;
  const canSubmit = !leadAlreadySubmitted && questionsAsked >= REQUIRED_QUESTIONS;

  const streamOptions = {
    apiKey: env.apiKey,
    model: env.model,
    // Once a lead is filed the tool is withdrawn entirely, so no later turn can
    // refile it and trigger a second notification email.
    system: leadAlreadySubmitted ? `${SYSTEM_PROMPT}\n${ALREADY_SUBMITTED_NOTE}` : SYSTEM_PROMPT,
    tools: canSubmit ? [LEAD_TOOL] : [],
    signal,
  };

  try {
    let pendingLead:
      | { name: string; args: Record<string, unknown>; thoughtSignature?: string }
      | null = null;

    for await (const event of streamGemini({ ...streamOptions, contents })) {
      if (event.type === 'text') yield { type: 'text', value: event.value };
      else if (event.name === 'submit_lead')
        pendingLead = {
          name: event.name,
          args: event.args,
          thoughtSignature: event.thoughtSignature,
        };
    }

    if (pendingLead) {
      const result = await submitLead(env.leadWebhookUrl, pendingLead.args as LeadArgs);
      yield { type: 'lead', saved: result.ok };

      // Gemini 3.x rejects a replayed functionCall unless its thoughtSignature comes back with it.
      contents.push({
        role: 'model',
        parts: [
          {
            functionCall: { name: pendingLead.name, args: pendingLead.args },
            thoughtSignature: pendingLead.thoughtSignature,
          },
        ],
      });

      contents.push({
        role: 'user',
        parts: [
          {
            functionResponse: {
              name: pendingLead.name,
              response: result.ok
                ? {
                    status: 'saved',
                    message: 'Enquiry recorded. Thank them briefly and say the team will follow up.',
                  }
                : {
                    status: 'failed',
                    message: 'Could not record it. Ask them to WhatsApp +91 63579 12345 instead.',
                  },
            },
          },
        ],
      });

      for await (const event of streamGemini({ ...streamOptions, contents, tools: [] })) {
        if (event.type === 'text') yield { type: 'text', value: event.value };
      }
    }

    yield { type: 'done' };
  } catch (error) {
    if (signal.aborted) return;

    const status = error instanceof GeminiError ? error.status : 0;
    console.error(`[chat] ${status || 'error'}:`, error instanceof Error ? error.message : error);

    yield {
      type: 'error',
      message:
        status === 429
          ? 'The assistant is busy right now. Please try again in a moment.'
          : 'Something went wrong. Please try again, or reach us on WhatsApp at +91 63579 12345.',
    };
  }
}
