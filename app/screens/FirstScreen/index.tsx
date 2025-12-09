"use client";

import { FC } from "react";
import CustomContainer from "@/components/ui/CustomContainer";
import GradientHeading from "@/components/ui/GradientHeading";
import styles from "@/components/ui/GradientHeading/styles.module.css";
import DateLocationBar from "@/components/shared_screens/Navbar/components/DateLocationBar";
import MainButton from "@/components/ui/MainButton";

const FirstScreen: FC = () => {
  return (
    <header id="top" className="relative min-h-screen flex items-center">
      <CustomContainer className="flex flex-col justify-center" fullHeight>
        <div className="max-w-4xl">
          <DateLocationBar />
          <GradientHeading
            className={`${styles.fluidHeadingMain} mb-6 mt-6`}
            level={1}
          >
            VII Встреча главных энергетиков Сибири
          </GradientHeading>
          <p className="text-white/70 text-lg md:text-xl max-w-3xl mb-4">
            Приглашаем вас на ключевое отраслевое событие года — VII Встречу главных энергетиков Сибири. 
            Мероприятие традиционно объединяет специалистов энергетической отрасли из Сибири и других регионов России.
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <MainButton
              text="Зарегистрироваться"
              href="#contact_us_screen"
            />
            <MainButton
              text="Программа"
              transparent
              href="#program"
              className="hidden sm:inline-flex"
            />
          </div>
        </div>
      </CustomContainer>
    </header>
  );
};

export default FirstScreen;
