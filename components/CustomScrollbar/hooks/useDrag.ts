import { useEffect } from "react";
import { ScrollbarRefs } from "../types";
import type Lenis from "lenis";

export const useDrag = (
  refs: ScrollbarRefs,
  lenis: Lenis | null,
  scrollPercentage: number,
  isDesktop: boolean
) => {
  useEffect(() => {
    if (!lenis || !refs.scrollbarRef.current || !isDesktop) return;

    const handleMouseDown = (e: MouseEvent) => {
      if (!refs.scrollbarRef.current) return;

      refs.isDragging.current = true;
      refs.startY.current = e.clientY;
      refs.startScrollPercentage.current = scrollPercentage;

      document.body.style.userSelect = "none";
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!refs.isDragging.current || !refs.scrollbarRef.current) return;

      const scrollbarHeight = refs.scrollbarRef.current.clientHeight;
      const delta = e.clientY - refs.startY.current;
      const deltaPercentage = (delta / scrollbarHeight) * 100;

      let newPercentage = refs.startScrollPercentage.current + deltaPercentage;
      newPercentage = Math.max(0, Math.min(100, newPercentage));

      const newScrollPosition =
        ((refs.contentHeightRef.current - refs.viewportHeightRef.current) *
          newPercentage) /
        100;
      lenis.scrollTo(newScrollPosition, { immediate: true });
    };

    const handleMouseUp = () => {
      refs.isDragging.current = false;
      document.body.style.userSelect = "";
    };

    refs.scrollbarRef.current.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      refs.scrollbarRef.current?.removeEventListener(
        "mousedown",
        handleMouseDown
      );
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [lenis, scrollPercentage, isDesktop, refs]);
};
