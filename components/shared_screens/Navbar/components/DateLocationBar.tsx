import { FC } from "react";
import CalendarIcon from "@/shared/icons/CalendarIcon";
import LocationIcon from "@/shared/icons/LocationIcon";

const DateLocationBar: FC = () => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 md:gap-8 text-white text-sm sm:text-base mb-4">
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
          <CalendarIcon className="w-3 h-3 sm:w-4 sm:h-4 text-white/70" />
        </div>
        <span className="whitespace-nowrap">24 апреля 2026 года</span>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
          <LocationIcon className="w-3 h-3 sm:w-4 sm:h-4 text-white/70" />
        </div>
        <span className="whitespace-nowrap">г. Барнаул</span>
      </div>
    </div>
  );
};

export default DateLocationBar;

