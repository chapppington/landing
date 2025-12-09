"use client";

import { PagesConfig } from "@/config/pages.config";

import { FC } from "react";
import Image from "next/image";
import TransitionLink from "@/components/ui/TransitionLink";
import { useFooterData } from "@/components/shared_screens/Footer/hooks/useFooterData";

// Маппинг ключей ссылок на их конфигурацию
const LINK_MAPPING: Record<string, { href: string; label: string }> = {
  about: PagesConfig.about,
  catalog: PagesConfig.catalog,
  news: PagesConfig.news,
  certificates: PagesConfig.certificates,
  vacancies: PagesConfig.vacancies,
  contacts: PagesConfig.contacts,
  production: PagesConfig.production,
  privacy: PagesConfig.privacy,
  questionnaire: PagesConfig.questionnaire,
};

const FooterTop: FC = () => {
  const { footerConfig, isLoading } = useFooterData();

  // Получаем ссылки из конфигурации
  const allLinks = footerConfig?.footerLinksConfig?.all_links || [];
  const tabletMenuLinks =
    footerConfig?.footerLinksConfig?.links_in_tablet_menu || [];

  // Преобразуем ключи в объекты с href и label
  const allLinksItems = allLinks
    .map((key) => {
      const config = LINK_MAPPING[key];
      return config ? { key, ...config } : null;
    })
    .filter(
      (item): item is { key: string; href: string; label: string } =>
        item !== null
    );

  const tabletMenuItems = tabletMenuLinks
    .map((key) => {
      const config = LINK_MAPPING[key];
      return config ? { key, ...config } : null;
    })
    .filter(
      (item): item is { key: string; href: string; label: string } =>
        item !== null
    );

  return (
    <div className="flex flex-col md:flex-row justify-between items-start mb-12">
      {/* Logo Section */}
      <div className="mb-8 md:mb-0">
        <TransitionLink
          href={PagesConfig.home.href}
          className="flex items-center"
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
      </div>

      {/* Navigation Links */}
      <div className="w-full md:w-auto">
        {/* Mobile Links (full width with arrows) */}
        <div className="md:hidden w-full space-y-4">
          {isLoading
            ? // Skeleton для мобильной версии
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="border-b border-white/30 pb-4">
                  <div className="flex justify-between items-center">
                    <div className="h-4 bg-white/20 rounded w-24 animate-pulse"></div>
                    <div className="h-4 bg-white/20 rounded w-4 animate-pulse"></div>
                  </div>
                </div>
              ))
            : [
                ...tabletMenuItems,
                ...allLinksItems.filter(
                  (item) =>
                    !tabletMenuItems.find(
                      (tabletItem) => tabletItem.key === item.key
                    )
                ),
              ].map((item) => (
                <div key={item.key} className="border-b border-white/30 pb-4">
                  <TransitionLink
                    href={item.href}
                    className="flex justify-between items-center text-white"
                  >
                    <span>{item.label}</span>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </TransitionLink>
                </div>
              ))}
        </div>

        {/* Desktop Links (grid) */}
        <div className="hidden md:flex justify-center items-center w-full">
          <div className="flex space-x-8 mx-auto">
            {/* Regular desktop items for md to 2xl screens */}
            <div className="hidden md:flex 2xl:hidden">
              {isLoading
                ? // Skeleton для десктопной версии
                  Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="ml-8">
                      <div className="h-4 bg-white/20 rounded w-20 animate-pulse"></div>
                    </div>
                  ))
                : tabletMenuItems.map((item) => (
                    <div key={item.key}>
                      <TransitionLink
                        href={item.href}
                        className="text-white hover:text-white/80 text-sm whitespace-nowrap relative select-none group transition-colors ml-8"
                      >
                        {item.label}
                        <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
                      </TransitionLink>
                    </div>
                  ))}
            </div>
            {/* All items for 2xl screens - сначала планшетные, потом все остальные */}
            <div className="hidden 2xl:flex">
              {isLoading
                ? // Skeleton для 2xl версии
                  Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="ml-8">
                      <div className="h-4 bg-white/20 rounded w-20 animate-pulse"></div>
                    </div>
                  ))
                : [
                    ...tabletMenuItems,
                    ...allLinksItems.filter(
                      (item) =>
                        !tabletMenuItems.find(
                          (tabletItem) => tabletItem.key === item.key
                        )
                    ),
                  ].map((item) => (
                    <div key={item.key}>
                      <TransitionLink
                        href={item.href}
                        className="text-white hover:text-white/80 text-sm whitespace-nowrap relative select-none group transition-colors ml-8"
                      >
                        {item.label}
                        <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
                      </TransitionLink>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterTop;
