import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useChat } from '../../hooks/useChat';
import ChatPanel from './ChatPanel';
import AgentAvatar from './AgentAvatar';

const TEASER_KEY = 'bp-chat-teaser-dismissed';
const TEASER_DELAY_MS = 4000;

function teaserDismissed() {
  try {
    return sessionStorage.getItem(TEASER_KEY) === '1';
  } catch {
    return false;
  }
}

function dismissTeaser() {
  try {
    sessionStorage.setItem(TEASER_KEY, '1');
  } catch {
    /* storage blocked: teaser just shows again next visit */
  }
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTeaser, setShowTeaser] = useState(false);
  const { messages, isTyping, isBusy, send } = useChat();

  // Greeting bubble next to the launcher, once per browser session
  useEffect(() => {
    if (teaserDismissed()) return;
    const timer = setTimeout(() => setShowTeaser(true), TEASER_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  const hideTeaser = () => {
    setShowTeaser(false);
    dismissTeaser();
  };

  const toggle = () => {
    hideTeaser();
    setIsOpen((open) => !open);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <ChatPanel
            messages={messages}
            isTyping={isTyping}
            isBusy={isBusy}
            onSend={send}
            onClose={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showTeaser && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            // Phones: above the launcher (beside it would hit the WhatsApp button). sm+: beside it.
            className="fixed bottom-[8.75rem] right-6 sm:bottom-[5.25rem] sm:right-[6.25rem] z-50 flex items-center gap-2 rounded-2xl rounded-br-md bg-white py-2.5 pl-4 pr-2 shadow-strong border border-neutral-200"
          >
            <button type="button" onClick={toggle} className="text-left">
              <p className="text-sm font-semibold text-neutral-900 whitespace-nowrap">Hi there! 👋</p>
              <p className="text-xs text-neutral-600 whitespace-nowrap">Need help with paper products?</p>
            </button>
            <button
              type="button"
              onClick={hideTeaser}
              aria-label="Dismiss"
              className="ml-1 flex h-6 w-6 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-700"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={toggle}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        aria-expanded={isOpen}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.92 }}
        className="fixed bottom-[4.5rem] right-6 z-50 h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-white p-[3px] shadow-strong ring-1 ring-neutral-200"
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.15 }}
              className="flex h-full w-full items-center justify-center rounded-full bg-primary text-white"
            >
              <X className="h-6 w-6" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.15 }}
              className="block h-full w-full"
            >
              <AgentAvatar className="h-full w-full" online pulse />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
