import { RefObject } from "react";

export interface ScrollbarRefs {
  scrollbarRef: RefObject<HTMLDivElement | null>;
  thumbRef: RefObject<HTMLDivElement | null>;
  isDragging: RefObject<boolean>;
  startY: RefObject<number>;
  startScrollPercentage: RefObject<number>;
  contentHeightRef: RefObject<number>;
  viewportHeightRef: RefObject<number>;
}

export interface ScrollbarState {
  scrollPercentage: number;
  contentHeight: number;
  viewportHeight: number;
  isHovered: boolean;
  isDesktop: boolean;
}

export interface ScrollbarConfig {
  desktopBreakpoint: number;
  thumbHeight: number;
}
