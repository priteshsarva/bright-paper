import { ReactNode } from 'react';
import { motion, MotionConfig } from 'framer-motion';

interface RevealProps {
  children: ReactNode;
  /** Position in the grid, used to stagger items across a row. */
  index?: number;
  /** Items per row at the widest layout; the stagger restarts every row. */
  perRow?: number;
  className?: string;
  onClick?: () => void;
}

/**
 * Rises, fades and un-scales its child into place when it scrolls into view,
 * staggered so a row of cards comes in one after another.
 */
export default function Reveal({ children, index = 0, perRow = 3, className = '', onClick }: RevealProps) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        onClick={onClick}
        className={className}
        initial={{ opacity: 0, y: 60, scale: 0.94 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.75, delay: (index % perRow) * 0.14, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}
