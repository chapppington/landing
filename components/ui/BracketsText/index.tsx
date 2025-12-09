import { FC } from "react";

import { IBracketsTextProps } from "@/components/ui/BracketsText/types";

const BracketsText: FC<IBracketsTextProps> = ({ children, className = "" }) => {
  return (
    <div className={`${className}`}>
      <span className={`text-white/40 text-sm tracking-wider`}>
        [ {children} ]
      </span>
    </div>
  );
};

export default BracketsText;
