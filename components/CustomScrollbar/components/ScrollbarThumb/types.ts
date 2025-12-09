import { RefObject } from "react";

export interface ScrollbarThumbProps {
  thumbRef: RefObject<HTMLDivElement | null>;
  scrollbarRef: RefObject<HTMLDivElement | null>;
  scrollPercentage: number;
}
