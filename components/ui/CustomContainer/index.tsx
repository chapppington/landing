import { FC } from "react";
import { ICustomContainerProps } from "@/components/ui/CustomContainer/types";

const CustomContainer: FC<ICustomContainerProps> = ({
  children,
  className,
  style,
  fullHeight = false,
}) => {
  return (
    <div
      className={`container mx-auto px-7 md:px-10 lg:px-10 2xl:px-28 ${
        className || ""
      }`}
      style={
        fullHeight ? { minHeight: "calc(100vh - 180px)", ...style } : style
      }
    >
      {children}
    </div>
  );
};

export default CustomContainer;
