import { ReactNode } from "react";

export interface ISectionHeaderProps {
  bracketsText: string;
  heading: ReactNode;
  description: string;
  desktopOrder?: {
    bracketsText: number;
    heading: number;
    description: number;
  };
}
