import { FC } from "react";
import { ScrollbarTrackProps } from "./types";

export const ScrollbarTrack: FC<ScrollbarTrackProps> = ({
  onTrackClick,
  scrollbarRef,
  children,
}) => (
  <div
    ref={scrollbarRef}
    className="fixed right-0 top-0 w-2 h-full bg-transparent z-50 cursor-pointer"
    onClick={onTrackClick}
  >
    {children}
  </div>
);
