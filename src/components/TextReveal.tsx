import { motion, useInView } from 'framer-motion';
import { Fragment, useRef } from 'react';

interface TextRevealProps {
    text: string;
    className?: string;
    delay?: number;
    duration?: number;
}

export default function TextReveal({
    text,
    className = "",
    delay = 0,
    duration = 0.5
}: TextRevealProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.03, // Stagger effect for character by character
                delayChildren: delay,
            },
        },
    };

    const childVariants = {
        hidden: {
            opacity: 0,
            y: 20,
            filter: 'blur(10px)',
        },
        visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: {
                duration: duration,
            },
        },
    };

    const words = text.split(" ");

    return (
        <motion.span
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className={`inline-block ${className}`}
        >
            {/* A real space between words (not just margin), so search engines and
                screen readers read "Premium Paper" instead of "PremiumPaper". */}
            {words.map((word, i) => (
                <Fragment key={i}>
                    {i > 0 && ' '}
                    <span className="inline-block whitespace-nowrap">
                        {word.split("").map((char, j) => (
                            <motion.span
                                key={`${i}-${j}`}
                                variants={childVariants}
                                className="inline-block"
                            >
                                {char}
                            </motion.span>
                        ))}
                    </span>
                </Fragment>
            ))}
        </motion.span>
    );
}
