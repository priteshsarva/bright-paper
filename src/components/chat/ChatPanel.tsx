import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import type { ChatMessage } from '../../types/chat';
import { CHAT_ASSISTANT } from '../../constants';
import logoMark from '../../assets/images/logo-mark.png';
import ChatMessageBubble from './ChatMessageBubble';
import TypingIndicator from './TypingIndicator';
import ChatComposer from './ChatComposer';

const SUGGESTIONS = [
  'What products do you offer?',
  'Do you deliver to my city?',
  'Request a quote',
];

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
      role="dialog"
      aria-label="Chat with Bright Paper"
      className="fixed z-50 flex flex-col bg-white overflow-hidden inset-x-4 bottom-24 h-[62vh] max-h-[460px] rounded-2xl shadow-strong border border-neutral-200 sm:inset-x-auto sm:right-6 sm:w-[380px] sm:h-[70vh] sm:max-h-[600px]"
    >
      <div className="flex-shrink-0 flex items-center gap-3 bg-primary px-4 py-3 text-white">
        {/* logo-mark.png is the BP glyph cropped out of the full wordmark, so it
            reads at avatar size where the full logo would be unintelligible. */}
        <div className="flex-shrink-0 w-9 h-9 rounded-full bg-white flex items-center justify-center">
          <img src={logoMark} alt="" className="w-5 h-5 object-contain" />
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm truncate">{CHAT_ASSISTANT.name}</p>
          <p className="text-xs text-white/80">{CHAT_ASSISTANT.subtitle}</p>
        </div>

        <button
          onClick={onClose}
          aria-label="Close chat"
          className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-white/20"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div
        ref={scrollRef}
        data-lenis-prevent
        role="log"
        aria-live="polite"
        className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-3 py-3 space-y-2.5"
      >
        {messages.map((message) => (
          <ChatMessageBubble key={message.id} message={message} />
        ))}

        <AnimatePresence>{isTyping && <TypingIndicator />}</AnimatePresence>

        {showSuggestions && (
          <div className="flex flex-wrap gap-2 pt-2">
            {SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => onSend(suggestion)}
                className="px-3 py-1.5 rounded-full border border-primary-200 bg-primary-50 text-primary-700 text-xs font-medium transition-colors hover:bg-primary-100"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>

      <ChatComposer onSend={onSend} disabled={isBusy} />
    </motion.div>
  );
}
