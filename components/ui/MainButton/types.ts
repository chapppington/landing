export type EButtonSize = "sm" | "md" | "lg" | "xl" | "2xl";

export interface IMainButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  size?: EButtonSize;
  href?: string;
  disableRedirect?: boolean;
  transparent?: boolean;
  fullWidth?: boolean;
  external?: boolean;
  disabled?: boolean;
}
