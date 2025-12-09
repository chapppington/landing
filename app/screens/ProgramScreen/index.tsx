"use client";

import { FC } from "react";
import CustomContainer from "@/components/ui/CustomContainer";
import SectionHeader from "@/components/ui/SectionHeader";

interface ProgramItem {
  time: string;
  title: string;
  moderator?: string;
}

const ProgramScreen: FC = () => {
  const programItems: ProgramItem[] = [
    {
      time: "09:00 – 09:30",
      title: "Регистрация участников",
    },
    {
      time: "09:30 – 11:00",
      title: "Утилизация тепла цифрового оборудования. Отопление с помощью майнинга",
      moderator: "Цымбал Алексей Юрьевич – Генеральный директор «LIAN Technology»",
    },
    {
      time: "10:00 – 18:30",
      title: "Конференция в рамках профильных секций",
    },
    {
      time: "11:30 – 13:00",
      title: "Возобновляемые источники энергии для промышленности и объектов ЖКХ Красноярского края",
      moderator: "Федосеев Евгений Валерьевич, заместитель министра промышленности Красноярского края",
    },
    {
      time: "13:30 – 15:00",
      title: "Фундаментальные и прикладные научные исследования в энергетике",
      moderator: "Алексеенко Сергей Владимирович – академик РАН, научный руководитель ИТ СО РАН",
    },
  ];

  return (
    <section id="program" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-transparent ">
      <CustomContainer>
        <SectionHeader
          bracketsText="ЧТО БУДЕТ НА ВСТРЕЧЕ"
          heading="Программа мероприятия"
          description=""
          desktopOrder={{
            bracketsText: 3,
            heading: 1,
            description: 2,
          }}
        />

        {/* Program List */}
        <div className="mt-8 md:mt-12 space-y-0">
          {programItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row gap-4 sm:gap-8 py-6 border-b border-white/10 last:border-b-0"
            >
              {/* Time */}
              <div className="flex-shrink-0 sm:w-48">
                <span className="text-white text-base sm:text-lg font-medium">
                  {item.time}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col gap-2">
                <h3 className="text-white text-base sm:text-lg font-normal">
                  {item.title}
                </h3>
                {item.moderator && (
                  <p className="text-white/70 text-sm sm:text-base">
                    {item.moderator}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CustomContainer>
    </section>
  );
};

export default ProgramScreen;

