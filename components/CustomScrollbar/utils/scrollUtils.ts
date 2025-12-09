import { CSSProperties, RefObject } from "react";
import { SCROLLBAR_CONFIG } from "../config";
export const calculateDocumentHeight = (): number => {
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight
  );
};

export const calculateScrollPercentage = (
  scrollTop: number,
  contentHeight: number,
  viewportHeight: number
): number => {
  const maxScroll = contentHeight - viewportHeight;
  if (maxScroll <= 0) return 0;
  return Math.min((scrollTop / maxScroll) * 100, 100);
};

export const getThumbStyle = (
  scrollbarRef: RefObject<HTMLDivElement | null>,
  scrollPercentage: number,
  thumbHeight: number
): CSSProperties => {
  const availableTravel = scrollbarRef.current
    ? scrollbarRef.current.clientHeight - thumbHeight - SCROLLBAR_CONFIG.navbarHeight
    : 0;

  return {
    transform: `translateY(${SCROLLBAR_CONFIG.navbarHeight + (scrollPercentage / 100) * availableTravel}px)`,
    height: `${thumbHeight}px`,
  };
};
