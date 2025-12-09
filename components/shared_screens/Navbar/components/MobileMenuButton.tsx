import { FC } from "react";

interface MobileMenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

const MobileMenuButton: FC<MobileMenuButtonProps> = ({ isOpen, onClick }) => {
  const ariaLabel = isOpen ? "Закрыть меню" : "Открыть меню";

  return (
    <button
      className="2xl:hidden px-0 z-[1003] relative w-6 h-6"
      onClick={onClick}
      aria-label={ariaLabel}
      aria-expanded={isOpen}
    >
      <div
        className={`absolute inset-0 transition-all duration-300 ${
          isOpen ? "rotate-45" : ""
        }`}
      >
        <span
          className={`absolute left-0 w-6 h-0.5 bg-white transition-all duration-300 rounded-full ${
            isOpen ? "top-3" : "top-1"
          }`}
        ></span>
        <span
          className={`absolute left-0 w-6 h-0.5 bg-white transition-all duration-300 rounded-full ${
            isOpen ? "opacity-0" : "opacity-100"
          } top-3`}
        ></span>
        <span
          className={`absolute left-0 w-6 h-0.5 bg-white transition-all duration-300 rounded-full ${
            isOpen ? "top-3 -rotate-90" : "top-5"
          }`}
        ></span>
      </div>
    </button>
  );
};

export default MobileMenuButton;
