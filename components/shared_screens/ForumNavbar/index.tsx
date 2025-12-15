"use client";

import { FC, useState, useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import CustomContainer from "@/components/ui/CustomContainer";
import ForumContactInfo from "./components/ForumContactInfo";

const ForumNavbar: FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement[]>([]);
  const contactSectionsRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (menuRef.current) {
      gsap.set(menuRef.current, { x: "100%" });
    }
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const ctx = gsap.context(() => {
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.to(menuRef.current, {
        x: 0,
        backgroundColor: "rgba(0, 0, 0, 1)",
        duration: 0.4,
        ease: "power2.out",
      });

      gsap.to(menuItemsRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.3,
        stagger: 0.05,
        ease: "power2.out",
        delay: 0.2,
      });

      gsap.to(contactSectionsRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.3,
        ease: "power2.out",
        delay: 0.3,
      });

      gsap.fromTo(
        closeButtonRef.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.3,
          ease: "back.out(1.7)",
          delay: 0.4,
        }
      );
    });

    return () => ctx.revert();
  }, [isMobileMenuOpen]);

  const handleMenuButtonClick = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleCloseMenu = () => {
    const ctx = gsap.context(() => {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });

      gsap.to(closeButtonRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
      });

      gsap.to(menuRef.current, {
        x: "100%",
        backgroundColor: "rgba(0, 0, 0, 0)",
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          setIsMobileMenuOpen(false);
        },
      });
    });

    return () => ctx.revert();
  };

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
    handleCloseMenu();
  };

  const menuItems = [
    { label: "Спикеры", href: "#speakers" },
    { label: "Программа", href: "#program" },
    { label: "Стать партнером", href: "#partner" },
    { label: "Место проведения", href: "#venue" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/30 pointer-events-none"
      style={{ backdropFilter: "blur(20px)" }}
    >
      <CustomContainer className="flex justify-between items-center h-[72px] 2xl:divide-x divide-white/30 pointer-events-auto relative">
        {/* Logo */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({
              top: 0,
              behavior: "smooth"
            });
          }}
          className="px-0 flex items-center select-none cursor-pointer"
        >
          <Image
            src="/logo.svg"
            alt="СИБКОМПЛЕКТ"
            width={175}
            height={35}
            className="h-25"
            priority
          />
        </a>

        {/* Desktop Menu */}
        <div className="hidden 2xl:flex items-center space-x-8 px-12 h-full">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleAnchorClick(e, item.href)}
              className="text-white text-sm hover:text-white/80 transition-colors relative select-none group cursor-pointer"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
        </div>

        {/* Контакты и CTA */}
        <div className="hidden 2xl:flex items-center h-full divide-x divide-white/30">
          <ForumContactInfo />
          <button
            onClick={(e) => {
              e.preventDefault();
              const element = document.querySelector("#contact_us_screen");
              if (element) {
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - 100;
                
                window.scrollTo({
                  top: offsetPosition,
                  behavior: "smooth"
                });
              }
            }}
            className="h-full px-8 bg-white text-gray-900 text-sm hover:bg-gray-50 transition-all duration-300 select-none relative overflow-hidden group"
          >
            <span className="relative z-10">Зарегистрироваться</span>
            <span className="absolute inset-0 bg-gray-200 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={handleMenuButtonClick}
          className="2xl:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 pointer-events-auto"
        >
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
              isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
              isMobileMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
              isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </CustomContainer>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="2xl:hidden fixed inset-0 z-[1000] pointer-events-auto">
          <div
            ref={overlayRef}
            className="fixed inset-0 bg-black/50 opacity-0 pointer-events-auto"
            onClick={handleCloseMenu}
          />
          <div
            ref={menuRef}
            className="fixed top-0 right-0 w-full md:w-[400px] h-screen bg-transparent overflow-y-auto pointer-events-auto"
          >
            <div className="sticky top-0 left-0 right-0 h-[72px] bg-black z-[1001] border-b border-white/20">
              <CustomContainer className="h-full flex justify-between items-center">
                <Image
                  src="/logo.svg"
                  alt="СИБКОМПЛЕКТ"
                  width={175}
                  height={35}
                  className="h-25"
                  priority
                />
                <button
                  ref={closeButtonRef}
                  onClick={handleCloseMenu}
                  className="w-8 h-8 flex items-center justify-center opacity-0"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white"
                  >
                    <path
                      d="M18 6L6 18M6 6l12 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </CustomContainer>
            </div>

            <div className="bg-black min-h-full">
              <CustomContainer className="pt-6 pb-6">
                <div className="flex flex-col">
                  {menuItems.map((item, index) => (
                    <div
                      key={item.href}
                      ref={(el) => {
                        if (el) menuItemsRef.current[index] = el;
                      }}
                      className="border-b border-white/30 opacity-0 translate-x-[50px]"
                    >
                      <a
                        href={item.href}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAnchorClick(e, item.href);
                        }}
                        className="text-white/80 text-lg leading-none flex items-center justify-between py-6 font-light"
                      >
                        {item.label}
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6 text-white/80"
                        >
                          <path
                            d="M9 18l6-6-6-6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                    </div>
                  ))}

                  <div
                    ref={contactSectionsRef}
                    className="mt-12 space-y-8 opacity-0 translate-x-[50px]"
                  >
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleCloseMenu();
                        const element = document.querySelector("#contact_us_screen");
                        if (element) {
                          const elementPosition = element.getBoundingClientRect().top;
                          const offsetPosition = elementPosition + window.pageYOffset - 100;
                          
                          window.scrollTo({
                            top: offsetPosition,
                            behavior: "smooth"
                          });
                        }
                      }}
                      className="px-8 py-3 bg-white text-gray-900 text-sm hover:bg-gray-50 transition-colors w-fit"
                    >
                      Зарегистрироваться
                    </button>
                  </div>
                </div>
              </CustomContainer>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default ForumNavbar;

