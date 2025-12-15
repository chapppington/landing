"use client";

import { useEffect, useState } from "react";

export const BreakpointIndicator = () => {
  // Only render in development
  if (process.env.NODE_ENV === "production") {
    return null;
  }

  const [breakpoint, setBreakpoint] = useState("xs");
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const updateBreakpoint = () => {
      const currentWidth = window.innerWidth;
      setWidth(currentWidth);

      if (currentWidth >= 1536) setBreakpoint("2xl");
      else if (currentWidth >= 1280) setBreakpoint("xl");
      else if (currentWidth >= 1024) setBreakpoint("lg");
      else if (currentWidth >= 768) setBreakpoint("md");
      else if (currentWidth >= 640) setBreakpoint("sm");
      else setBreakpoint("xs");
    };

    // Initial update
    updateBreakpoint();

    // Add event listener
    window.addEventListener("resize", updateBreakpoint);

    // Cleanup
    return () => window.removeEventListener("resize", updateBreakpoint);
  }, []);

  return (
    <div
      id="breakpoint-indicator"
      className="fixed top-24 right-20 bg-black/80 text-white px-4 py-2 rounded-full z-50 font-mono text-sm backdrop-blur"
    >
      <span className="hidden xs:inline sm:hidden">xs</span>
      <span className="hidden sm:inline md:hidden">sm</span>
      <span className="hidden md:inline lg:hidden">md</span>
      <span className="hidden lg:inline xl:hidden">lg</span>
      <span className="hidden xl:inline 2xl:hidden">xl</span>
      <span className="hidden 2xl:inline">2xl</span>
      <span className="ml-2">({width}px)</span>
    </div>
  );
};
