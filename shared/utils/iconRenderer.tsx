import * as LucideIcons from "lucide-react";
import { LucideProps } from "lucide-react";

interface IconRendererProps extends Omit<LucideProps, "ref"> {
  iconName: string;
  fallback?: React.ReactNode;
}

export default function IconRenderer({
  iconName,
  fallback = null,
  ...props
}: IconRendererProps) {
  if (!iconName) {
    return fallback;
  }

  const IconComponent = (LucideIcons as any)[iconName];

  if (!IconComponent) {
    console.warn(`Icon "${iconName}" not found in Lucide icons`);
    return fallback;
  }

  return <IconComponent {...props} />;
}

// Утилита для проверки существования иконки
export function isValidIconName(iconName: string): boolean {
  return iconName in LucideIcons;
}

// Утилита для получения списка всех доступных иконок
export function getAvailableIcons(): string[] {
  return Object.keys(LucideIcons).filter(
    (name) => name !== "createLucideIcon" && name !== "Icon"
  );
}
