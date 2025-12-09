"use client";

import { FC } from "react";
import CustomContainer from "@/components/ui/CustomContainer";
import SectionHeader from "@/components/ui/SectionHeader";

const AboutConferenceScreen: FC = () => {
  const cards = [
    {
      title: "Трансформация традиционной энергетики",
      description:
        "Современные вызовы, модернизация инфраструктуры, инвестиции и переход к низкоуглеродной модели.",
    },
    {
      title: "Трансформация традиционной энергетики",
      description:
        "Современные вызовы, модернизация инфраструктуры, инвестиции и переход к низкоуглеродной модели.",
    },
    {
      title: "Трансформация традиционной энергетики",
      description:
        "Современные вызовы, модернизация инфраструктуры, инвестиции и переход к низкоуглеродной модели.",
    },
    {
      title: "Трансформация традиционной энергетики",
      description:
        "Современные вызовы, модернизация инфраструктуры, инвестиции и переход к низкоуглеродной модели.",
    },
    {
      title: "Трансформация традиционной энергетики",
      description:
        "Современные вызовы, модернизация инфраструктуры, инвестиции и переход к низкоуглеродной модели.",
    },
    {
      title: "Трансформация традиционной энергетики",
      description:
        "Современные вызовы, модернизация инфраструктуры, инвестиции и переход к низкоуглеродной модели.",
    },
  ];

  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-transparent">
      <CustomContainer>
        <SectionHeader
          bracketsText="О КОНФЕРЕНЦИИ"
          heading="О конференции"
          description="В рамках программы мероприятия запланирована конференция по актуальным вопросам развития энергетической отрасли с участием ведущих экспертов, а также организация специализированной выставочной зоны для демонстрации современного оборудования и технологий."
          desktopOrder={{
            bracketsText: 3,
            heading: 1,
            description: 2,
          }}
        />

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8 mt-8 md:mt-12">
          {cards.map((card, index) => (
            <div
              key={index}
              className="group flex flex-col bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              {/* Content */}
              <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow">
                <h3 className="text-lg sm:text-xl md:text-xl font-semibold text-white mb-3 sm:mb-4">
                  {card.title}
                </h3>
                <p className="text-white/60 text-xs sm:text-sm leading-relaxed flex-grow">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CustomContainer>
    </section>
  );
};

export default AboutConferenceScreen;
