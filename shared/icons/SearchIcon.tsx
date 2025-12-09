import { FC } from "react";

interface SearchIconProps {
  className?: string;
}

export const SearchIcon: FC<SearchIconProps> = ({
  className = "w-12 h-12 text-white/40",
}) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);
