import {
  parseChatRequest,
  rateLimited,
  sseFrame,
  streamChat,
  ChatRequestError,
  SSE_HEADERS,
  type ChatEnv,
} from '../../server/chatCore';

const DEFAULT_MODEL = 'gemini-3.6-flash';

/**
 * Production counterpart of the Vite dev plugin: same chatCore, different
 * transport. Reached at /api/chat through the redirect in netlify.toml, so the
 * browser calls one URL in development and in production.
 *
 * The keys are read from Netlify's environment (Site configuration →
 * Environment variables), never from a VITE_ variable — a VITE_ prefix would
 * compile them into the browser bundle for anyone to read.
 */
export default async (req: Request): Promise<Response> => {
  const json = (status: number, body: Record<string, unknown>) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { 'Content-Type': 'application/json' },
    });

  if (req.method !== 'POST') return json(405, { error: 'Method not allowed' });

  const env: ChatEnv = {
    apiKey: process.env.GEMINI_API_KEY ?? '',
    model: process.env.GEMINI_MODEL || DEFAULT_MODEL,
    leadWebhookUrl: process.env.LEAD_WEBHOOK_URL ?? '',
  };

  if (!env.apiKey) {
    console.error('[chat] GEMINI_API_KEY is not set on this deploy.');
    return json(500, { error: 'The assistant is not configured yet.' });
  }

  const ip =
    req.headers.get('x-nf-client-connection-ip') ??
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    'unknown';

  if (rateLimited(ip)) {
    return json(429, { error: 'Too many messages. Please try again in a few minutes.' });
  }

  let parsed;
  try {
    parsed = parseChatRequest(await req.text());
  } catch (error) {
    const status = error instanceof ChatRequestError ? error.status : 400;
    return json(status, { error: error instanceof Error ? error.message : 'Invalid request' });
  }

  // Aborts when the visitor closes the tab, so a dropped connection stops the
  // Gemini stream instead of running the function to its timeout.
  const controller = new AbortController();
  req.signal.addEventListener('abort', () => controller.abort());

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(streamController) {
      try {
        for await (const event of streamChat({ ...parsed, env, signal: controller.signal })) {
          streamController.enqueue(encoder.encode(sseFrame(event)));
        }
      } catch (error) {
        console.error('[chat] stream failed:', error);
        streamController.enqueue(
          encoder.encode(
            sseFrame({
              type: 'error',
              message:
                'Something went wrong. Please try again, or reach us on WhatsApp at +91 63579 12345.',
            }),
          ),
        );
      } finally {
        streamController.close();
      }
    },
    cancel() {
      controller.abort();
    },
  });

  return new Response(stream, { status: 200, headers: SSE_HEADERS });
};
