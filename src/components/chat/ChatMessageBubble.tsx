import { Fragment, type ReactNode } from 'react';
import { motion } from 'motion/react';
import logoMark from '../../assets/images/logo-mark.png';
import type { ChatMessage } from '../../types/chat';

interface ChatMessageBubbleProps {
  message: ChatMessage;
}

/**
 * The bot marks the detail it is asking for as **bold** — the only formatting
 * the prompt allows. Rendering it here keeps the asterisks out of the bubble.
 *
 * A reply arrives one token at a time, so mid-stream the opening ** is on
 * screen before the closing one exists. An unclosed run is therefore treated as
 * bold too: the text turns bold as it types instead of showing stray asterisks.
 */
function renderBold(text: string): ReactNode[] {
  return text.split(/\*\*/).map((part, index) =>
    index % 2 === 1 ? <strong key={index}>{part}</strong> : <Fragment key={index}>{part}</Fragment>,
  );
}

export default function ChatMessageBubble({ message }: ChatMessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`flex items-end gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {!isUser && (
        <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary-50 flex items-center justify-center">
          <img src={logoMark} alt="" className="w-4 h-4 object-contain" />
        </div>
      )}

      <div
        className={`max-w-[78%] px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap break-words ${
          isUser
            ? 'bg-primary text-white rounded-2xl rounded-br-md'
            : 'bg-neutral-100 text-neutral-800 rounded-2xl rounded-bl-md'
        }`}
      >
        {isUser ? message.content : renderBold(message.content)}
      </div>
    </motion.div>
  );
}
