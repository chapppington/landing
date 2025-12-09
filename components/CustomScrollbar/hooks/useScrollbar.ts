import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { ScrollbarRefs, ScrollbarState, ScrollbarConfig } from "../types";
import { calculateScrollPercentage } from "../utils/scrollUtils";
import { SCROLLBAR_CONFIG } from "../config";

export const useScrollbar = (config: ScrollbarConfig = SCROLLBAR_CONFIG) => {
  const [state, setState] = useState<ScrollbarState>({
    scrollPercentage: 0,
    contentHeight: 0,
    viewportHeight: 0,
    isHovered: false,
    isDesktop: false,
  });

  const refs: ScrollbarRefs = {
    scrollbarRef: useRef<HTMLDivElement>(null),
    thumbRef: useRef<HTMLDivElement>(null),
    isDragging: useRef(false),
    startY: useRef(0),
    startScrollPercentage: useRef(0),
    contentHeightRef: useRef(0),
    viewportHeightRef: useRef(0),
  };

  const pathname = usePathname();
  const lenis = useLenis();

  // Handle desktop detection
  useEffect(() => {
    const checkIfDesktop = () => {
      setState((prev) => ({
        ...prev,
        isDesktop: window.innerWidth >= config.desktopBreakpoint,
      }));
    };

    checkIfDesktop();
    window.addEventListener("resize", checkIfDesktop);
    return () => window.removeEventListener("resize", checkIfDesktop);
  }, [config.desktopBreakpoint]);

  // Reset scroll on page change
  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
      setState((prev) => ({ ...prev, scrollPercentage: 0 }));
    }
  }, [pathname, lenis]);

  // Handle scroll and height calculations
  useEffect(() => {
    if (!lenis || !state.isDesktop) return;

    const updateScrollState = () => {
      const contentHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      const scrollTop = lenis.scroll;

      // Update refs for drag functionality
      refs.contentHeightRef.current = contentHeight;
      refs.viewportHeightRef.current = viewportHeight;

      setState((prev) => ({
        ...prev,
        contentHeight,
        viewportHeight,
        scrollPercentage: calculateScrollPercentage(
          scrollTop,
          contentHeight,
          viewportHeight
        ),
      }));
    };

    // Initial calculation
    updateScrollState();

    // Setup scroll listener
    lenis.on("scroll", updateScrollState);

    // Setup resize listener with debounce
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateScrollState, 100);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      lenis.off("scroll", updateScrollState);
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [lenis, state.isDesktop]);

  return { state, refs, lenis };
};
