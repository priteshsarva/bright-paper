import { Fragment, type ReactNode } from 'react';
import { motion } from 'motion/react';
import AgentAvatar from './AgentAvatar';
import type { ChatMessage } from '../../types/chat';

interface ChatMessageBubbleProps {
  message: ChatMessage;
  time?: string;
  /** Hide the avatar when the previous message is from the same sender. */
  grouped?: boolean;
}

/**
 * The bot marks the detail it is asking for as **bold**, the only formatting
 * the prompt allows. Rendering it here keeps the asterisks out of the bubble.
 *
 * A reply arrives one token at a time, so mid-stream the opening ** is on
 * screen before the closing one exists. An unclosed run is therefore treated as
 * bold too: the text turns bold as it types instead of showing stray asterisks.
 */
function renderBold(text: string): ReactNode[] {
  return text.split(/\*\*/).map((part, index) =>
    index % 2 === 1 ? (
      <strong key={index} className="font-semibold text-neutral-900">{part}</strong>
    ) : (
      <Fragment key={index}>{part}</Fragment>
    ),
  );
}

const NUMBERED = /^\s*\d+[.)]\s+/;
const BULLET = /^\s*[-•*]\s+/;

/** Turns plain reply text into paragraphs and proper numbered / bulleted lists. */
function renderRich(text: string): ReactNode[] {
  const blocks: ReactNode[] = [];
  const lines = text.split('\n');
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (NUMBERED.test(line) || BULLET.test(line)) {
      const ordered = NUMBERED.test(line);
      const pattern = ordered ? NUMBERED : BULLET;
      const items: string[] = [];
      while (i < lines.length && pattern.test(lines[i])) {
        items.push(lines[i].replace(pattern, ''));
        i++;
      }
      const ListTag = ordered ? 'ol' : 'ul';
      blocks.push(
        <ListTag key={`l${i}`} className="my-1 space-y-1">
          {items.map((item, n) => (
            <li key={n} className="flex gap-2.5">
              <span className="mt-[1px] flex h-5 min-w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary-50 px-1 text-[11px] font-semibold text-primary-700">
                {ordered ? n + 1 : '•'}
              </span>
              <span>{renderBold(item)}</span>
            </li>
          ))}
        </ListTag>,
      );
      continue;
    }
    if (line.trim() === '') {
      i++;
      continue;
    }
    const para: string[] = [];
    while (i < lines.length && lines[i].trim() !== '' && !NUMBERED.test(lines[i]) && !BULLET.test(lines[i])) {
      para.push(lines[i]);
      i++;
    }
    blocks.push(
      <p key={`p${i}`} className="whitespace-pre-wrap">
        {renderBold(para.join('\n'))}
      </p>,
    );
  }
  return blocks;
}

export default function ChatMessageBubble({ message, time, grouped = false }: ChatMessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`flex items-start gap-2.5 ${isUser ? 'justify-end' : 'justify-start'} ${grouped ? 'mt-1.5' : 'mt-4'}`}
    >
      {!isUser && (grouped ? <span className="w-8 flex-shrink-0" /> : <AgentAvatar className="w-8 h-8 mt-0.5" />)}

      <div className={`flex max-w-[80%] flex-col ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`px-4 py-2.5 text-[13.5px] leading-relaxed break-words ${
            isUser
              ? 'bg-gradient-to-br from-primary to-primary-600 text-white rounded-2xl rounded-tr-md shadow-sm whitespace-pre-wrap'
              : 'space-y-2 bg-white text-neutral-700 rounded-2xl rounded-tl-md border border-neutral-200/80 shadow-[0_1px_2px_rgba(0,0,0,0.04)]'
          }`}
        >
          {isUser ? message.content : renderRich(message.content)}
        </div>
        {time && <span className="mt-1 px-1 text-[10.5px] text-neutral-400">{time}</span>}
      </div>
    </motion.div>
  );
}
