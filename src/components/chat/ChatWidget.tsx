import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X } from 'lucide-react';
import { useChat } from '../../hooks/useChat';
import ChatPanel from './ChatPanel';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, isTyping, isBusy, send } = useChat();

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

      <motion.button
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        aria-expanded={isOpen}
        whileTap={{ scale: 0.92 }}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary text-white shadow-strong flex items-center justify-center transition-colors duration-200 hover:bg-primary-600"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isOpen ? 'close' : 'open'}
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.15 }}
          >
            {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </>
  );
}
