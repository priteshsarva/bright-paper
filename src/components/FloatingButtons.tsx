import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { COMPANY_INFO } from '../constants';
import { scrollToTop } from '../hooks/useSmoothScroll';

const WHATSAPP_TEXT = 'Hi, I found you through the Bright Paper website and would like to know more about your paper products.';
const SHOW_AFTER_PX = 400;

// Outer outline of the glyph below, used (scaled up) as the solid green bubble.
const BUBBLE =
  'M20.465 3.488A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.465 3.488Z';

/** WhatsApp-style mark: green gradient bubble with a white ring and handset. */
function WhatsAppLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="-2.6 -2.6 29.2 29.2" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="wa-bubble" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#61FD7D" />
          <stop offset="1" stopColor="#25CF43" />
        </linearGradient>
      </defs>
      <path d={BUBBLE} fill="url(#wa-bubble)" transform="translate(12 12) scale(1.2) translate(-12 -12)" />
      <path fill="#fff" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.465 3.488" />
    </svg>
  );
}

/**
 * WhatsApp button (bottom-left) and back-to-top button (bottom-right, under the
 * chat launcher, shown once the page has been scrolled).
 */
export default function FloatingButtons() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > SHOW_AFTER_PX);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const whatsappHref = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(WHATSAPP_TEXT)}`;

  return (
    <>
      {/* WhatsApp: bottom-left, level with the chat launcher on the right */}
      <motion.a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.92 }}
        // Same bottom offset and size as the chat launcher so the two sit in one row
        className="group fixed bottom-[4.5rem] left-6 z-50 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center"
      >
        <WhatsAppLogo className="h-full w-full drop-shadow-[0_6px_10px_rgba(0,0,0,0.22)]" />
        <span className="pointer-events-none absolute left-full ml-3 hidden whitespace-nowrap rounded-lg bg-neutral-900 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-medium transition-opacity duration-200 group-hover:opacity-100 sm:block">
          Chat on WhatsApp
        </span>
      </motion.a>

      {/* Back to top: bottom-right, centred under the chat launcher */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            title="Back to top"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-5 right-8 sm:right-9 z-50 flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-800/85 text-white shadow-medium backdrop-blur-sm transition-colors hover:bg-primary"
          >
            <ArrowUp className="h-5 w-5" strokeWidth={2.5} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
