import { PagesConfig } from "@/config/pages.config";
import { FC, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import gsap from "gsap";
import MainButton from "@/components/ui/MainButton";
import CustomContainer from "@/components/ui/CustomContainer";
import TransitionLink from "@/components/ui/TransitionLink";
import { IMobileMenuProps } from "@/components/shared_screens/Navbar/types";
import { useNavbarConfigPublic } from "@/hooks/useNavbarConfigPublic";
import { IMenuItem } from "@/components/shared_screens/Navbar/types";

const MobileMenu: FC<IMobileMenuProps> = ({ isOpen, onClose }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement[]>([]);
  const contactSectionsRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const { config } = useNavbarConfigPublic();
  const links = config?.desktopNavbarConfig?.links_shown || [];
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
  const phone = config?.navbarPhone || "";
  const email = config?.navbarEmail || "";

  useEffect(() => {
    if (menuRef.current) {
      gsap.set(menuRef.current, { x: "100%" });
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;

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
  }, [isOpen]);

  const handleClose = () => {
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
          onClose();
        },
      });
    });

    return () => ctx.revert();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] pointer-events-auto">
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/50 opacity-0 pointer-events-auto"
        onClick={handleClose}
      />
      <div
        ref={menuRef}
        className="fixed top-0 right-0 w-full md:w-[400px] h-screen bg-transparent overflow-y-auto pointer-events-auto"
      >
        <div className="sticky top-0 left-0 right-0 h-[72px] bg-black z-[1001] border-b border-white/20">
          <CustomContainer className="h-full flex justify-start items-center">
            <Image
              src="/logo.svg"
              alt="СИБКОМПЛЕКТ"
              width={175}
              height={35}
              className="h-25"
              priority
            />
          </CustomContainer>
        </div>

        <div className="bg-black min-h-full">
          <CustomContainer className="pt-6 pb-6">
            <div className="flex flex-col">
              {items.map((item: IMenuItem, index: number) => (
                <div
                  key={item.href}
                  ref={(el) => {
                    if (el) menuItemsRef.current[index] = el;
                  }}
                  className="border-b border-white/30 opacity-0 translate-x-[50px]"
                >
                  <TransitionLink
                    href={item.href}
                    className="text-white/80 text-lg leading-none flex items-center justify-between py-6 font-light"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClose();
                    }}
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
                  </TransitionLink>
                </div>
              ))}

              <div
                ref={contactSectionsRef}
                className="mt-12 space-y-8 opacity-0 translate-x-[50px]"
              >
                {(phone || email) && (
                  <div className="space-y-4">
                    <h3 className="text-white/60 text-sm">• Контакты</h3>
                    <div className="space-y-2">
                      {phone && (
                        <a
                          href={`tel:${phone.replace(/\D/g, "")}`}
                          className="text-white flex items-center gap-2"
                        >
                          <span className="w-6 h-6 flex items-center justify-center">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                          {phone}
                        </a>
                      )}
                      {email && (
                        <a
                          href={`mailto:${email}`}
                          className="text-white flex items-center gap-2"
                        >
                          <span className="w-6 h-6 flex items-center justify-center">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M22 6l-10 7L2 6"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                          {email}
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {/* Можно добавить адрес и другие секции, если появятся в config */}

                <MainButton text="Отправить заявку" />
              </div>

              <div className="mt-auto pt-12 space-y-4">
                <p className="text-white/50 text-sm">
                  © 2024г. Все права защищены.
                </p>
                <div className="space-y-2">
                  <TransitionLink
                    href={PagesConfig.privacy.href}
                    className="text-white/50 text-sm hover:text-white block"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClose();
                    }}
                  >
                    Политика конфиденциальности
                  </TransitionLink>
                </div>
              </div>
            </div>
          </CustomContainer>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
