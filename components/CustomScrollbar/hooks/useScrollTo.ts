import { MouseEvent } from "react";

interface ScrollRefs {
  contentHeightRef: { current: number };
  viewportHeightRef: { current: number };
  scrollbarRef: { current: HTMLDivElement | null };
}

export const useScrollTo = (refs: ScrollRefs, lenis: any) => {
  const scrollTo = (percentage: number) => {
    const maxScroll =
      refs.contentHeightRef.current - refs.viewportHeightRef.current;
    const targetScrollTop = (percentage / 100) * maxScroll;

    if (lenis) {
      lenis.scrollTo(targetScrollTop);
    }
  };

  const handleTrackClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!refs.scrollbarRef.current) return;

    const rect = refs.scrollbarRef.current.getBoundingClientRect();
    const clickPositionY = e.clientY - rect.top;
    const percentage = (clickPositionY / rect.height) * 100;

    scrollTo(percentage);
  };

  return { handleTrackClick };
};
