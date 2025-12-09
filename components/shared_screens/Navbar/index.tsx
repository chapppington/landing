"use client";

import { PagesConfig } from "@/config/pages.config";

import { FC, useState } from "react";
import Image from "next/image";
import TransitionLink from "@/components/ui/TransitionLink";
import CustomContainer from "@/components/ui/CustomContainer";
import ContactInfo from "./components/ContactInfo";
import DesktopMenuItemsList from "./components/DesktopMenuItemsList";
import MobileMenu from "./components/MobileMenu";
import MobileMenuButton from "./components/MobileMenuButton";
import CTAButton from "./components/CTAButton";
import DesktopDropdownMenu from "./components/DesktopDropdownMenu";

const Navbar: FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMenuButtonClick = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleCloseMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/30 pointer-events-none"
      style={{ backdropFilter: "blur(20px)" }}
    >
      <CustomContainer className="flex justify-between items-center h-[72px] 2xl:divide-x divide-white/30 pointer-events-auto relative">
        <TransitionLink
          href={PagesConfig.home.href}
          className="px-0 flex items-center select-none"
        >
          <Image
            src="/logo.svg"
            alt="СИБКОМПЛЕКТ"
            width={175}
            height={35}
            className="h-25"
            priority
          />
        </TransitionLink>

        {/* Меню и бургер */}
        <div className="hidden 2xl:flex items-center relative flex-shrink-0 h-full">
          <DesktopMenuItemsList />
          <div className="absolute top-1/2 -right-4 -translate-y-1/2 z-50">
            <DesktopDropdownMenu />
          </div>
        </div>

        {/* Контакты и CTA */}
        <div className="hidden 2xl:flex items-center h-full divide-x divide-white/30">
          <ContactInfo />
          <CTAButton />
        </div>

        <MobileMenuButton
          isOpen={isMobileMenuOpen}
          onClick={handleMenuButtonClick}
        />
      </CustomContainer>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={handleCloseMenu} />
    </nav>
  );
};

export default Navbar;
