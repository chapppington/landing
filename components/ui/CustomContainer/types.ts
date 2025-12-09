import { CSSProperties, ReactNode } from "react";

export interface ICustomContainerProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  fullHeight?: boolean;
}
