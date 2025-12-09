"use client";

import { PagesConfig } from "@/config/pages.config";

import GradientHeading from "@/components/ui/GradientHeading";
import MainButton from "@/components/ui/MainButton";
import BracketsText from "@/components/ui/BracketsText";
import CustomContainer from "@/components/ui/CustomContainer";
import AnimatedText from "@/components/ui/AnimatedText";
import styles from "./styles.module.css";

export default function NotFoundScreen() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center py-24 relative overflow-hidden">
      <CustomContainer>
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left side - Text content */}
          <div className="flex-1 flex flex-col items-start justify-center">
            <BracketsText className="mb-6">404 ОШИБКА</BracketsText>

            <AnimatedText>
              <GradientHeading className="mb-6">
                Страница не найдена
              </GradientHeading>
            </AnimatedText>

            <div className="flex items-center mb-8">
              <div className="h-0.5 w-12 bg-white/20 mr-4"></div>
              <AnimatedText>
                <span className="text-white/60">
                  Кажется, вы забрели в неизведанную территорию
                </span>
              </AnimatedText>
            </div>

            <AnimatedText>
              <p className="text-white/80 text-lg mb-8 max-w-lg">
                Страница, которую вы ищете, не существует или была перемещена.
              </p>
            </AnimatedText>

            <MainButton text="Вернуться на главную" href={PagesConfig.home.href} className="mt-4" />
          </div>

          {/* Right side - 404 Display */}
          <div className="flex-1 flex items-center justify-center">
            <div className={styles.glitchContainer}>
              <div className={styles.errorCode}>
                <span className={styles.digit}>4</span>
                <span className={styles.digit}>0</span>
                <span className={styles.digit}>4</span>
              </div>
              <div className={styles.gridLines}></div>
            </div>
          </div>
        </div>
      </CustomContainer>
    </main>
  );
}
