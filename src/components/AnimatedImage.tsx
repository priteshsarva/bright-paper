import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'none';
    delay?: number;
    duration?: number;
    containerClassName?: string;
    threshold?: number;
    shine?: boolean;
}

export default function AnimatedImage({
    direction = 'up',
    delay = 0,
    duration = 0.6,
    containerClassName = '',
    className = '',
    threshold = 0.2,
    shine = false,
    ...props
}: AnimatedImageProps) {
    const getVariants = () => {
        switch (direction) {
            case 'up':
                return { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } };
            case 'down':
                return { hidden: { opacity: 0, y: -50 }, visible: { opacity: 1, y: 0 } };
            case 'left':
                return { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0 } };
            case 'right':
                return { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } };
            case 'scale':
                return { hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } };
            default:
                return { hidden: { opacity: 0 }, visible: { opacity: 1 } };
        }
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: threshold }}
            variants={getVariants()}
            transition={{ duration, delay, ease: "easeOut" }}
            className={`${containerClassName} ${shine ? 'shine-wrapper' : ''}`}
        >
            <img className={className} {...props} />
        </motion.div>
    );
}
