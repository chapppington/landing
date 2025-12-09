import { FC } from "react";
import { getThumbStyle } from "../../utils/scrollUtils";
import { SCROLLBAR_CONFIG } from "../../config";
import { ScrollbarThumbProps } from "./types";

export const ScrollbarThumb: FC<ScrollbarThumbProps> = ({
  thumbRef,
  scrollbarRef,
  scrollPercentage,
}) => (
  <div
    ref={thumbRef}
    className="w-full bg-gray-400 rounded-full transition-opacity duration-200 hover:bg-gray-500"
    style={getThumbStyle(
      scrollbarRef,
      scrollPercentage,
      SCROLLBAR_CONFIG.thumbHeight
    )}
  />
);
