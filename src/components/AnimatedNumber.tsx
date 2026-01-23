import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useCountUp } from '../hooks/useCountUp';

interface AnimatedNumberProps {
    end: number;
    duration?: number;
    decimals?: number;
    suffix?: string;
    prefix?: string;
    separator?: string;
    className?: string;
}

export default function AnimatedNumber({
    end,
    duration = 2000,
    decimals = 0,
    suffix = '',
    prefix = '',
    separator = ',',
    className = '',
}: AnimatedNumberProps) {
    const { ref, isIntersecting } = useIntersectionObserver({
        threshold: 0.3,
        triggerOnce: true,
    });

    const count = useCountUp(
        {
            end,
            duration,
            decimals,
            suffix,
            prefix,
            separator,
        },
        isIntersecting
    );

    return (
        <span ref={ref} className={className}>
            {count}
        </span>
    );
}
