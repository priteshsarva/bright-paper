import { useEffect, useRef, useState, FormEvent, KeyboardEvent } from 'react';
import { Send } from 'lucide-react';

interface ChatComposerProps {
  onSend: (text: string) => void;
  disabled?: boolean;
}

export default function ChatComposer({ onSend, disabled = false }: ChatComposerProps) {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }, [value]);

  const submit = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue('');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    submit();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex-shrink-0 flex items-end gap-2 border-t border-neutral-200 bg-white px-3 py-2.5"
    >
      <textarea
        ref={textareaRef}
        rows={1}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask about our paper products..."
        aria-label="Message"
        className="flex-1 resize-none bg-neutral-100 rounded-xl px-4 py-2.5 text-sm text-neutral-800 placeholder:text-neutral-400 outline-none focus:ring-2 focus:ring-primary-200 max-h-[120px]"
      />

      <button
        type="submit"
        disabled={disabled || !value.trim()}
        aria-label="Send message"
        className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center transition-all duration-200 hover:bg-primary-600 active:bg-primary-700 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <Send className="w-4 h-4" />
      </button>
    </form>
  );
}
