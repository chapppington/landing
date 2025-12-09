import { ReactNode, Ref } from "react";

export interface IGradientHeadingProps {
  children: ReactNode;
  className?: string;
  ref?: Ref<HTMLHeadingElement>;
  level?: 1 | 2 | 3 | 4 | 5 | 6; // Heading level, defaults to 2
  style?: React.CSSProperties;
}
