"use client";

import { FC } from "react";
import CustomContainer from "@/components/ui/CustomContainer";
import SectionHeader from "@/components/ui/SectionHeader";
import YandexMapContainer from "@/components/ui/YandexMapContainer";
import LocationIcon from "@/shared/icons/LocationIcon";

const VenueScreen: FC = () => {
  const venueCoordinates: [number, number] = [53.28176519514845, 83.63670434125575];
  const address = "Алтайский край, г. Барнаул, ул. Пионерская Долина, 4";

  const features = [
    "4000+ УЧАСТНИКОВ",
    "ЗОНА ВЫСТАВКИ НА 50+ СТЕНДОВ",
    "ЗОНА ДЛЯ VIP-УЧАСТНИКОВ И СПИКЕРОВ",
    "ЗОНА НЕТВОРКИНГА И КОФЕ-БРЕЙКА ДЛЯ ВСЕХ УЧАСТНИКОВ",
  ];

  return (
    <section id="venue" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-transparent ">
      <CustomContainer>
        <SectionHeader
          bracketsText="ЛОКАЦИЯ"
          heading="Место проведения"
          description=""
          desktopOrder={{
            bracketsText: 3,
            heading: 1,
            description: 2,
          }}
        />

        {/* Map and Info Grid */}
        <div className="mt-8 md:mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Left - Map (second on mobile, first on desktop) */}
          <div className="w-full h-full min-h-[400px] md:min-h-[500px] lg:min-h-[600px] order-2 lg:order-1">
            <div className="w-full h-full rounded-xl overflow-hidden">
              <YandexMapContainer
                initialCoordinates={venueCoordinates}
                height="100%"
                zoom={14}
              />
            </div>
          </div>

          {/* Right - Info Block (first on mobile, second on desktop) */}
          <div className="flex flex-col justify-center bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 md:p-8 lg:p-10 order-1 lg:order-2">
            {/* Address Pill */}
            <div className="mb-6 flex items-center justify-start">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full">
                <LocationIcon className="w-4 h-4 text-white flex-shrink-0" />
                <span className="text-white text-xs md:text-sm font-medium">
                  {address}
                </span>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8">
              ПАРК-ОТЕЛЬ "ЧАЙКА"
            </h2>

            {/* Features List */}
            <ul className="space-y-4 md:space-y-5">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-white rounded-sm mt-2 flex-shrink-0" />
                  <span className="text-white/80 text-sm md:text-base lg:text-lg leading-relaxed">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CustomContainer>
    </section>
  );
};

export default VenueScreen;

