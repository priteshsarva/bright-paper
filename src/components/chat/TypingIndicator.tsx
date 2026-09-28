import { motion } from 'motion/react';
import logoMark from '../../assets/images/logo-mark.png';

export default function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex items-end gap-2"
    >
      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary-50 flex items-center justify-center">
        <img src={logoMark} alt="" className="w-4 h-4 object-contain" />
      </div>

      <div className="bg-neutral-100 rounded-2xl rounded-bl-md px-4 py-3.5 flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-neutral-400"
            animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
    </motion.div>
  );
}
