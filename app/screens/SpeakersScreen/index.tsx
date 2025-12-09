"use client";

import { FC } from "react";
import Image from "next/image";
import CustomContainer from "@/components/ui/CustomContainer";
import SectionHeader from "@/components/ui/SectionHeader";

const SpeakersScreen: FC = () => {
  // Плейсхолдеры для спикеров
  const speakers = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: "АРТЕМИЙ ЛЕБЕДЕВ",
    position: "Должность",
    image: "/man.png", // Плейсхолдер изображения
  }));

  return (
    <section id="speakers" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-transparent ">
      <CustomContainer>
        <SectionHeader
          bracketsText="УЧАСТНИКИ"
          heading="Спикеры"
          description="На встрече выступят признанные специалисты энергетической отрасли, которые представят актуальные тренды, поделятся практическим опытом и обсудят стратегические вопросы развития энергетики региона."
          desktopOrder={{
            bracketsText: 3,
            heading: 1,
            description: 2,
          }}
        />

        {/* Speakers Grid */}
        <div className="mt-8 md:mt-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5 md:gap-6">
            {speakers.map((speaker) => (
              <div key={speaker.id} className="flex flex-col group">
                {/* Image */}
                <div className="bg-white/10 rounded-xl overflow-hidden mb-3 sm:mb-4 aspect-square w-full flex items-center justify-center relative">
                  <Image
                    src={speaker.image}
                    alt={speaker.name}
                    fill
                    className="object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Inner element placeholder */}
                 {/* <div className="absolute bottom-2 left-2 right-2 h-2 bg-white/30 rounded-full" /> */}
                </div>

                {/* Name and Position */}
                <div className="space-y-1">
                  <h3 className="text-white text-sm sm:text-base font-semibold uppercase leading-tight">
                    {speaker.name.split(" ").map((word, i, arr) => (
                      <span key={i}>
                        {word}
                        {i < arr.length - 1 && <br />}
                      </span>
                    ))}
                  </h3>
                  <p className="text-white/60 text-xs sm:text-sm font-normal">
                    {speaker.position}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CustomContainer>
    </section>
  );
};

export default SpeakersScreen;

