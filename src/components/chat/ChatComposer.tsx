import { useEffect, useRef, useState, FormEvent, KeyboardEvent } from 'react';
import { ArrowUp } from 'lucide-react';

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

  const canSend = !disabled && value.trim().length > 0;

  return (
    <div className="flex-shrink-0 border-t border-neutral-100 bg-white px-3 pt-3 pb-2">
      <form
        onSubmit={handleSubmit}
        className="flex items-end gap-2 rounded-[22px] border border-neutral-200 bg-neutral-50 py-1.5 pl-4 pr-1.5 transition-colors focus-within:border-primary-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-primary-50"
      >
        <textarea
          ref={textareaRef}
          rows={1}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          aria-label="Message"
          className="flex-1 resize-none self-center bg-transparent py-1.5 text-sm text-neutral-800 placeholder:text-neutral-400 outline-none max-h-[120px]"
        />

        <button
          type="submit"
          disabled={!canSend}
          aria-label="Send message"
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-sm transition-all duration-200 hover:bg-primary-600 active:scale-95 disabled:bg-neutral-200 disabled:text-neutral-400 disabled:shadow-none disabled:cursor-not-allowed"
        >
          <ArrowUp className="h-[18px] w-[18px]" strokeWidth={2.5} />
        </button>
      </form>
      <p className="mt-1.5 text-center text-[10.5px] text-neutral-400">
        Powered by <span className="font-semibold text-neutral-500">Bright Paper</span>
      </p>
    </div>
  );
}
