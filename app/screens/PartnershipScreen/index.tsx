"use client";

import { FC } from "react";
import CustomContainer from "@/components/ui/CustomContainer";
import SectionHeader from "@/components/ui/SectionHeader";

const PartnershipScreen: FC = () => {
  const cards = [
    {
      title: "Демонстрация продуктов и решений",
      description:
        "Презентация ваших разработок перед целевой аудиторией позволит наглядно показать их преимущества и практическую ценность.",
    },
    {
      title: "Рост узнаваемости бренда",
      description:
        "Активное участие в мероприятии повысит видимость компании на рынке и укрепит ее позиционирование как эксперта в отрасли.",
    },
    {
      title: "Установление перспективных контактов",
      description:
        "Прямое взаимодействие с ключевыми представителями отрасли позволит заложить основу для будущих партнерств и совместных проектов.",
    },
  ];

  return (
    <section id="partner" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-transparent ">
      <CustomContainer>
        <SectionHeader
          bracketsText="ПАРТНЕРСТВО"
          heading={
            <>
              Станьте партнером
              <br />
              встречи
            </>
          }
          description="Это уникальная возможность для укрепления деловой репутации и прямого контакта с целевой аудиторией"
          desktopOrder={{
            bracketsText: 3,
            heading: 1,
            description: 2,
          }}
        />

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className="group flex flex-col bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              {/* Image Placeholder */}
              <div className="w-full h-40 sm:h-44 md:h-48 lg:h-52 bg-white/10 rounded-t-xl flex items-center justify-center">
                <div className="w-full h-full bg-gradient-to-br from-white/5 to-white/10" />
              </div>

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

export default PartnershipScreen;

