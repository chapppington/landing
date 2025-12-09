"use client";

import { PagesConfig } from "@/config/pages.config";

import { FC } from "react";
import TransitionLink from "@/components/ui/TransitionLink";

const FooterBottom: FC = () => {
  return (
    <div className="border-t border-white/30 pt-8">
      {/* Mobile version (stacked vertically) */}
      <div className="md:hidden space-y-4">
        <p className="text-white/80 text-sm">
          © {new Date().getFullYear()}г. Все права защищены.
        </p>
        <TransitionLink
          href={PagesConfig.privacy.href}
          className="block text-white/80 text-sm hover:text-white/70"
        >
          Политика обработки персональных данных
        </TransitionLink>
      </div>
      {/* Desktop version (flex row) */}
      <div className="hidden md:flex md:flex-row justify-between items-center">
        <p className="text-white/80 text-sm">
          © {new Date().getFullYear()}г. Все права защищены.
        </p>
        <div className="flex space-x-6">
          <TransitionLink
            href={PagesConfig.privacy.href}
            className="text-white/80 text-sm hover:text-white/70 relative select-none group transition-colors"
          >
            Политика обработки персональных данных
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
          </TransitionLink>
        </div>
      </div>
    </div>
  );
};

export default FooterBottom;
