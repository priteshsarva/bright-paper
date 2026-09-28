import { useCallback, useEffect, useRef, useState } from 'react';
import type { ChatMessage } from '../types/chat';
import { streamChat } from '../utils/chatClient';

const GREETING =
  "Hi! I'm the Bright Paper assistant. Ask me about our paper grades, minimum order quantities, or delivery.";

const FALLBACK_ERROR =
  'Sorry, I could not reach the assistant. Please try again, or WhatsApp us at +91 63579 12345.';

const greetingMessage: ChatMessage = { id: 'greeting', role: 'assistant', content: GREETING };

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([greetingMessage]);
  const [isTyping, setIsTyping] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const [leadSaved, setLeadSaved] = useState(false);

  // A ref, not state: send() is a stable callback and would capture a stale flag.
  const leadSavedRef = useRef(false);
  const idRef = useRef(0);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => () => abortRef.current?.abort(), []);

  const send = useCallback(async (text: string) => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    const userMessage: ChatMessage = {
      id: `msg-${++idRef.current}`,
      role: 'user',
      content: text,
    };
    const replyId = `msg-${++idRef.current}`;

    let history: ChatMessage[] = [];
    setMessages((prev) => {
      history = [...prev, userMessage];
      return history;
    });
    setIsTyping(true);
    setIsBusy(true);

    let streamed = '';

    const appendToReply = (chunk: string) => {
      streamed += chunk;
      setMessages((prev) => {
        if (!prev.some((m) => m.id === replyId)) {
          return [...prev, { id: replyId, role: 'assistant', content: streamed }];
        }
        return prev.map((m) => (m.id === replyId ? { ...m, content: streamed } : m));
      });
    };

    try {
      await streamChat({
        messages: history,
        leadSubmitted: leadSavedRef.current,
        signal: controller.signal,
        onEvent: (event) => {
          if (event.type === 'text') {
            setIsTyping(false);
            appendToReply(event.value);
          } else if (event.type === 'lead') {
            if (event.saved) leadSavedRef.current = true;
            setLeadSaved(event.saved);
          } else if (event.type === 'error') {
            appendToReply(streamed ? `\n\n${event.message}` : event.message);
          }
        },
      });

      if (!streamed) appendToReply(FALLBACK_ERROR);
    } catch (error) {
      if (controller.signal.aborted) return;
      console.error('[chat]', error);
      appendToReply(streamed ? `\n\n${FALLBACK_ERROR}` : FALLBACK_ERROR);
    } finally {
      if (!controller.signal.aborted) {
        setIsTyping(false);
        setIsBusy(false);
      }
    }
  }, []);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    setMessages([greetingMessage]);
    setIsTyping(false);
    setIsBusy(false);
    leadSavedRef.current = false;
    setLeadSaved(false);
  }, []);

  return { messages, isTyping, isBusy, leadSaved, send, reset };
}
