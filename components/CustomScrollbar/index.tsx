"use client";

import { FC } from "react";
import { useScrollbar } from "./hooks/useScrollbar";
import { useDrag } from "./hooks/useDrag";
import { useScrollTo } from "./hooks/useScrollTo";
import { ScrollbarTrack } from "./components/ScrollbarTrack";
import { ScrollbarThumb } from "./components/ScrollbarThumb";

const CustomScrollbar: FC = () => {
  const { state, refs, lenis } = useScrollbar();
  const { scrollPercentage, isDesktop } = state;
  const { handleTrackClick } = useScrollTo(refs, lenis);

  useDrag(refs, lenis || null, scrollPercentage, isDesktop);

  // Skip rendering on mobile
  if (!isDesktop) return null;

  return (
    <ScrollbarTrack
      onTrackClick={handleTrackClick}
      scrollbarRef={refs.scrollbarRef}
    >
      <ScrollbarThumb
        thumbRef={refs.thumbRef}
        scrollbarRef={refs.scrollbarRef}
        scrollPercentage={scrollPercentage}
      />
    </ScrollbarTrack>
  );
};

export default CustomScrollbar;
