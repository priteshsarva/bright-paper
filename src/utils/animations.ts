// Horizontal slide-in for blocks that scroll into view.
// Negative fromX = enters from the left, positive = from the right.
//
// Pair it with framer-motion's useInView on the *stationary* outer element (the section),
// not on the sliding child: the child sits 160px off to the side while hidden, so observing
// it directly makes the browser think it is off screen and the animation often never fires.
// It replays every time (not once) because the CTA and footer live outside <Routes> and
// never remount between pages.
export const slideIn = (fromX: number, inView: boolean, delay = 0) => ({
  initial: { opacity: 0, x: fromX },
  animate: inView ? { opacity: 1, x: 0 } : { opacity: 0, x: fromX },
  transition: { duration: 0.9, delay: inView ? delay : 0, ease: [0.22, 1, 0.36, 1] as const },
});
