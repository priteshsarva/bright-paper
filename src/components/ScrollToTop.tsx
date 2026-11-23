import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getLenis } from "../hooks/useSmoothScroll";

// Jump to the top of each new page. This goes through Lenis when it is running:
// a native window.scrollTo is overridden by Lenis while its scroll momentum is
// still going, so the new page could otherwise open halfway down.
const ScrollToTop: React.FC = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        const lenis = getLenis();
        if (lenis) {
            lenis.scrollTo(0, { immediate: true, force: true });
        } else {
            window.scrollTo({ top: 0, left: 0 });
        }
    }, [pathname]);

    return null;
};

export default ScrollToTop;
