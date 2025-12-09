"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import TransitionLink from "@/components/ui/TransitionLink";
import { PagesConfig } from "@/config/pages.config";
import { useNavbarConfigPublic } from "@/hooks/useNavbarConfigPublic";

const DesktopDropdownMenu = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { config } = useNavbarConfigPublic();
  const links = config?.desktopNavbarConfig?.links_in_hidden_menu || [];
  const items = useMemo(
    () =>
      links
        .map((key: keyof typeof PagesConfig) => {
          const page = PagesConfig[key];
          return page ? { href: page.href, label: page.label } : null;
        })
        .filter(Boolean),
    [links]
  );

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div className="relative ml-0 flex items-center" ref={ref}>
      <button
        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
        onClick={() => setOpen((v) => !v)}
        aria-label="Дополнительное меню"
        type="button"
      >
        <span className="flex flex-col justify-center items-center w-6 h-6">
          <span
            className={`block w-6 h-0.5 bg-white mb-1 transition-all ${
              open ? "rotate-45 translate-y-1.5" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-white mb-1 transition-all ${
              open ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-white transition-all ${
              open ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          ></span>
        </span>
      </button>
      {open && items.length > 0 && (
        <div className="absolute top-full right-0 mt-2 w-56 bg-black/30 border border-white/20 rounded-lg shadow-lg z-50 py-2 animate-fade-in backdrop-blur-xl backdrop-saturate-150">
          {items.map((item: { href: string; label: string }) => (
            <TransitionLink
              key={item.href}
              href={item.href}
              className="block px-6 py-3 text-white text-sm hover:bg-white/10 transition-colors whitespace-nowrap"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </TransitionLink>
          ))}
        </div>
      )}
    </div>
  );
};

export default DesktopDropdownMenu;
