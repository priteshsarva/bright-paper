import type { ChatMessage } from '../types/chat';

export type ChatStreamEvent =
  | { type: 'text'; value: string }
  | { type: 'lead'; saved: boolean }
  | { type: 'done' }
  | { type: 'error'; message: string };

interface StreamChatOptions {
  leadSubmitted: boolean;
  messages: ChatMessage[];
  signal: AbortSignal;
  onEvent: (event: ChatStreamEvent) => void;
}

/**
 * POSTs the transcript to /api/chat and forwards each SSE frame as it arrives.
 */
export async function streamChat({
  messages,
  leadSubmitted,
  signal,
  onEvent,
}: StreamChatOptions): Promise<void> {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    signal,
    body: JSON.stringify({
      messages: messages.map(({ role, content }) => ({ role, content })),
      leadSubmitted,
    }),
  });

  if (!response.ok || !response.body) {
    const detail = await response.json().catch(() => null);
    throw new Error(detail?.error ?? `Request failed (${response.status})`);
  }

  const reader = response.body.getReader();
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
      if (!payload) continue;

      try {
        onEvent(JSON.parse(payload) as ChatStreamEvent);
      } catch {
        // ignore a frame split across reads; the next chunk completes it
      }
    }
  }
}
