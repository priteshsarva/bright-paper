import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ArrowRight, Phone } from 'lucide-react';
import type { ChatMessage } from '../../types/chat';
import { CHAT_ASSISTANT, COMPANY_INFO } from '../../constants';
import ChatMessageBubble from './ChatMessageBubble';
import TypingIndicator from './TypingIndicator';
import ChatComposer from './ChatComposer';
import AgentAvatar from './AgentAvatar';

const SUGGESTIONS = [
  'What products do you offer?',
  'Do you deliver to my city?',
  'Request a quote',
];

// When each message first appeared. Module-level so times survive closing and
// reopening the panel; message ids are unique for the life of the page.
const firstSeen = new Map<string, number>();
const timeFormat = new Intl.DateTimeFormat('en-IN', { hour: 'numeric', minute: '2-digit' });

function timeFor(id: string) {
  if (!firstSeen.has(id)) firstSeen.set(id, Date.now());
  return timeFormat.format(firstSeen.get(id));
}

interface ChatPanelProps {
  messages: ChatMessage[];
  isTyping: boolean;
  isBusy: boolean;
  onSend: (text: string) => void;
  onClose: () => void;
}

export default function ChatPanel({
  messages,
  isTyping,
  isBusy,
  onSend,
  onClose,
}: ChatPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    // Wait for the new message to lay out before measuring scrollHeight.
    const frame = requestAnimationFrame(() => {
      el.scrollTop = el.scrollHeight;
    });
    return () => cancelAnimationFrame(frame);
  }, [messages, isTyping]);

  const showSuggestions = messages.length <= 1 && !isTyping;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 16, scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
      style={{ transformOrigin: 'bottom right' }}
      role="dialog"
      aria-label="Chat with Bright Paper"
      className="fixed z-50 flex flex-col overflow-hidden bg-white inset-x-3 bottom-[8.5rem] h-[70vh] max-h-[560px] rounded-3xl border border-neutral-200/80 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.25)] sm:inset-x-auto sm:right-6 sm:bottom-[9.5rem] sm:w-[390px] sm:h-[72vh] sm:max-h-[640px]"
    >
      {/* Brand strip */}
      <div className="h-1 flex-shrink-0 bg-gradient-to-r from-primary via-primary-400 to-secondary-400" />

      {/* Header */}
      <div className="flex flex-shrink-0 items-center gap-3 border-b border-neutral-100 bg-white px-4 py-3">
        <AgentAvatar className="w-11 h-11" online />

        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-semibold text-neutral-900">{CHAT_ASSISTANT.name}</p>
          <p className="flex items-center gap-1.5 text-xs text-neutral-500">
            <span className="font-medium text-green-600">Online</span>
            <span className="text-neutral-300">•</span>
            <span className="truncate">{CHAT_ASSISTANT.subtitle}</span>
          </p>
        </div>

        <a
          href={`tel:${COMPANY_INFO.phone}`}
          aria-label="Call us"
          title="Call us"
          className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-primary"
        >
          <Phone className="h-[18px] w-[18px]" />
        </a>
        <button
          onClick={onClose}
          aria-label="Minimise chat"
          title="Minimise"
          className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
        >
          <ChevronDown className="h-5 w-5" />
        </button>
      </div>

      {/* Conversation */}
      <div
        ref={scrollRef}
        data-lenis-prevent
        role="log"
        aria-live="polite"
        className="min-h-0 flex-1 overflow-y-auto overscroll-contain bg-[#f7f7f8] px-4 pb-4 pt-2"
      >
        <div className="my-2 flex items-center gap-3">
          <span className="h-px flex-1 bg-neutral-200" />
          <span className="text-[10.5px] font-medium uppercase tracking-wider text-neutral-400">Today</span>
          <span className="h-px flex-1 bg-neutral-200" />
        </div>

        {messages.map((message, index) => (
          <ChatMessageBubble
            key={message.id}
            message={message}
            time={timeFor(message.id)}
            grouped={index > 0 && messages[index - 1].role === message.role}
          />
        ))}

        <AnimatePresence>{isTyping && <TypingIndicator />}</AnimatePresence>

        {showSuggestions && (
          <div className="ml-[42px] mt-3 flex flex-col items-start gap-2">
            {SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => onSend(suggestion)}
                className="group flex items-center gap-2 rounded-full border border-primary-200 bg-white px-3.5 py-1.5 text-[13px] font-medium text-primary-700 shadow-sm transition-all hover:border-primary hover:bg-primary hover:text-white"
              >
                {suggestion}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>
            ))}
          </div>
        )}
      </div>

      <ChatComposer onSend={onSend} disabled={isBusy} />
    </motion.div>
  );
}
