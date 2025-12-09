import { FC } from "react";
import GradientHeading from "@/components/ui/GradientHeading";
import BracketsText from "@/components/ui/BracketsText";
import { ISectionHeaderProps } from "@/components/ui/SectionHeader/types";

const SectionHeader: FC<ISectionHeaderProps> = ({
  bracketsText,
  heading,
  description,
  desktopOrder = {
    bracketsText: 1,
    heading: 2,
    description: 3,
  },
}) => {
  // Create an array of elements with their order
  const desktopElements = [
    {
      element: (
        <BracketsText
          key="brackets"
          className="text-white/60 md:w-full lg:w-auto"
        >
          {bracketsText.toUpperCase()}
        </BracketsText>
      ),
      order: desktopOrder.bracketsText,
    },
    {
      element: <GradientHeading key="heading">{heading}</GradientHeading>,
      order: desktopOrder.heading,
    },
    {
      element: (
        <p
          key="description"
          className="text-white/60 max-w-md text-left md:w-full lg:w-auto lg:max-w-md"
        >
          {description}
        </p>
      ),
      order: desktopOrder.description,
    },
  ];

  // Sort elements based on their order
  const sortedDesktopElements = desktopElements.sort(
    (a, b) => a.order - b.order
  );

  return (
    <>
      {/* Desktop Header */}
      <div className="hidden md:flex justify-between items-start mb-12 flex-wrap gap-y-6">
        {sortedDesktopElements.map((item) => item.element)}
      </div>

      {/* Mobile Header */}
      <div className="md:hidden mb-8">
        <BracketsText className="text-white/60 mb-2">
          {bracketsText.toUpperCase()}
        </BracketsText>
        <GradientHeading className="text-3xl mt-3">{heading}</GradientHeading>
        <p className="text-white/60 max-w-md text-left mt-5">{description}</p>
      </div>
    </>
  );
};

export default SectionHeader;
