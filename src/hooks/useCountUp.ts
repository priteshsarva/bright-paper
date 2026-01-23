import { useEffect, useState } from 'react';

interface UseCountUpOptions {
    end: number;
    duration?: number;
    start?: number;
    decimals?: number;
    suffix?: string;
    prefix?: string;
    separator?: string;
}

export function useCountUp(
    options: UseCountUpOptions,
    shouldStart: boolean = false
) {
    const {
        end,
        duration = 2000,
        start = 0,
        decimals = 0,
        suffix = '',
        prefix = '',
        separator = ',',
    } = options;

    const [count, setCount] = useState(start);
    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
        if (!shouldStart || hasStarted) return;

        setHasStarted(true);
        const startTime = Date.now();
        const range = end - start;

        // Easing function (easeOutQuad)
        const easeOutQuad = (t: number): number => t * (2 - t);

        const timer = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const easedProgress = easeOutQuad(progress);
            const currentCount = start + range * easedProgress;

            setCount(currentCount);

            if (progress === 1) {
                clearInterval(timer);
                setCount(end);
            }
        }, 16); // ~60fps

        return () => clearInterval(timer);
    }, [shouldStart, end, start, duration, hasStarted]);

    // Format the number
    const formatNumber = (num: number): string => {
        const fixed = num.toFixed(decimals);

        // Add thousand separators if needed
        if (separator) {
            const parts = fixed.split('.');
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
            return prefix + parts.join('.') + suffix;
        }

        return prefix + fixed + suffix;
    };

    return formatNumber(count);
}
