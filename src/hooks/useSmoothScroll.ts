import { useEffect } from 'react';
import Lenis from 'lenis';

// The live Lenis instance, so programmatic scrolls (e.g. "back to top") can go
// through it. A native window.scrollTo is overridden by Lenis while its scroll
// momentum is still running, which made the first click appear to do nothing.
let lenisInstance: Lenis | null = null;

export function getLenis() {
    return lenisInstance;
}

/** Smoothly scroll to the top, via Lenis when it is running. */
export function scrollToTop() {
    if (lenisInstance) {
        lenisInstance.scrollTo(0, { duration: 1.2, force: true });
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

export function useSmoothScroll() {
    useEffect(() => {
        // Initialize Lenis
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
        });
        lenisInstance = lenis;

        // Animation frame loop
        let frame = 0;
        function raf(time: number) {
            lenis.raf(time);
            frame = requestAnimationFrame(raf);
        }

        frame = requestAnimationFrame(raf);

        // Cleanup
        return () => {
            cancelAnimationFrame(frame);
            lenis.destroy();
            if (lenisInstance === lenis) lenisInstance = null;
        };
    }, []);
}
