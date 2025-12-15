"use client";

import ReactLenis from "lenis/react";
import { WebGLProvider } from "@/components/ui/BackgroundGradient/WebGLContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.16,
        wheelMultiplier: 1,
        smoothWheel: true,
        orientation: "vertical",
        gestureOrientation: "vertical",
        infinite: false,
        syncTouch: true,
      }}
    >
      <WebGLProvider>
        {children}
      </WebGLProvider>
    </ReactLenis>
  );
}
