"use client";

import { FC } from "react";
import Image from "next/image";
import CustomContainer from "@/components/ui/CustomContainer";
import SectionHeader from "@/components/ui/SectionHeader";
import MainButton from "@/components/ui/MainButton";
import TelegramIcon from "@/shared/icons/TelegramIcon";

const OrganizerScreen: FC = () => {
  return (
    <section id="organizer" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-transparent">
      <CustomContainer>
        <SectionHeader
          bracketsText="ОРГАНИЗАТОР"
          heading="Организатор форума"
          description=""
          desktopOrder={{
            bracketsText: 3,
            heading: 1,
            description: 2,
          }}
        />

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 xl:mt-24">
          {/* Left Section - Logo and Text */}
          <div className="flex flex-col">
            {/* Logo */}
            <div className="mb-6 md:mb-8 flex justify-center lg:justify-start">
              <div className="w-full max-w-[300px] md:max-w-[400px]">
                <Image
                  src="/logo.svg"
                  alt="СИБКОМПЛЕКТ"
                  width={200}
                  height={40}
                  className="h-12 md:h-16 w-auto object-contain"
                />
              </div>
            </div>

            {/* Subscription Text */}
            <p className="text-white/70 text-sm md:text-base lg:text-lg leading-relaxed max-w-md">
              Подпишитесь на наши ресурсы чтобы получать актуальную информацию с проходящих деловых мероприятий и анонсы будущих
            </p>
          </div>

          {/* Right Section - Media Rows */}
          <div className="flex flex-col gap-4 md:gap-6">
            {/* Telegram Row */}
            <div className="flex items-center gap-4">
              {/* Left: Icon and Text */}
              <div className="flex items-center gap-3 mt-6">
                <TelegramIcon className="w-10 h-10 sm:w-12 sm:h-12 text-white flex-shrink-0" />
                <span className="text-white text-sm md:text-base font-medium leading-none">Telegram</span>
              </div>
              
              {/* Right: Button */}
              <div className="flex-shrink-0 flex items-center">
                <MainButton
                  text="Подписаться"
                  href="#"
                  disableRedirect
                  external
                  transparent
                />
              </div>
            </div>

            {/* Second Row */}
            <div className="flex items-center gap-4">
              {/* Left: Icon and Text */}
              <div className="flex items-center gap-3 mt-6">
                <TelegramIcon className="w-10 h-10 sm:w-12 sm:h-12 text-white flex-shrink-0" />
                <span className="text-white text-sm md:text-base font-medium leading-none">Telegram</span>
              </div>
              
              {/* Right: Button */}
              <div className="flex-shrink-0 flex items-center">
                <MainButton
                  text="Подписаться"
                  href="#"
                  disableRedirect
                  external
                  transparent
                />
              </div>
            </div>
          </div>
        </div>
      </CustomContainer>
    </section>
  );
};

export default OrganizerScreen;

