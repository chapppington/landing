import { FC, useMemo, useState, useRef, useEffect } from "react";
import TransitionLink from "@/components/ui/TransitionLink";
import { useNavbarConfigPublic } from "@/hooks/useNavbarConfigPublic";
import { PagesConfig } from "@/config/pages.config";

const ALL_PAGES_LABELS: Record<string, string> = {
  home: "Главная",
  about: "О компании",
  catalog: "Каталог",
  portfolio: "Портфолио",
  news: "Новости",
  certificates: "Сертификаты",
  vacancies: "Вакансии",
  contacts: "Контакты",
  privacy: "Политика конфиденциальности",
  questionnaire: "Опросные листы",
  production: "Производство",
};

const DesktopMenu: FC = () => {
  const { config } = useNavbarConfigPublic();
  const links = config?.desktopNavbarConfig?.links_shown || [];
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const items = useMemo(
    () =>
      links
        .map((key: string) => {
          const href = (PagesConfig as any)[key]?.href;
          const label = ALL_PAGES_LABELS[key] || key;
          return href ? { href, label } : null;
        })
        .filter(Boolean),
    [links]
  );

  // Закрытие dropdown при клике вне его
  useEffect(() => {
    if (!dropdownOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [dropdownOpen]);

  return (
    <div className="hidden 2xl:flex items-center space-x-8 px-12 h-full">
      {items.map((item: { href: string; label: string }, index: number) => {
        // 3-й элемент (индекс 2) с выпадающим списком
        if (index === 2) {
          return (
            <div
              key={item.href}
              className="relative"
              ref={dropdownRef}
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <TransitionLink
                href={item.href}
                className="text-white text-sm hover:text-white/80 transition-colors relative select-none group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
              </TransitionLink>
              
              {dropdownOpen && (
                <div className="absolute top-full left-0 pt-2">
                  <div className="w-56 bg-black/30 border border-white/20 rounded-lg shadow-lg z-50 py-1 backdrop-blur-xl backdrop-saturate-150">
                    <TransitionLink
                      href={PagesConfig.production.href}
                      className="block px-4 py-2 text-white text-sm hover:bg-white/10 transition-colors whitespace-nowrap"
                      onClick={() => setDropdownOpen(false)}
                    >
                      О производстве
                    </TransitionLink>
                  </div>
                </div>
              )}
            </div>
          );
        }

        // Остальные элементы без изменений
        return (
          <TransitionLink
            key={item.href}
            href={item.href}
            className="text-white text-sm hover:text-white/80 transition-colors relative select-none group"
          >
            {item.label}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
          </TransitionLink>
        );
      })}
    </div>
  );
};

export default DesktopMenu;
