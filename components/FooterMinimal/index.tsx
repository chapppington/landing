"use client";

import Image from "next/image";
import CustomContainer from "@/components/ui/CustomContainer";

const navLinks = [
  { href: "#about", label: "О конференции" },
  { href: "#speakers", label: "Спикеры" },
  { href: "#program", label: "Программа" },
  { href: "#partner", label: "Партнерство" },
  { href: "#organizer", label: "Организатор" },
  { href: "#venue", label: "Локация" },
  { href: "#contact_us_screen", label: "Регистрация" },
];

const FooterMinimal = () => {

  const handleAnchorClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - 100;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <footer className="py-10 bg-transparent border-t border-white/10">
      <CustomContainer className="flex flex-col gap-6 text-white/60 text-sm md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          
          <span>VII Встреча главных энергетиков Сибири</span>
        </div>

        <nav className="flex flex-wrap gap-4 text-white/70 text-sm">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleAnchorClick(e, link.href)}
              className="text-white text-sm hover:text-white/80 transition-colors relative select-none group cursor-pointer"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </CustomContainer>
    </footer>
  );
};

export default FooterMinimal;
