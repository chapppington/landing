"use client";

import { FC, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import CustomContainer from "@/components/ui/CustomContainer";
import SectionHeader from "@/components/ui/SectionHeader";
import CustomSlider from "@/components/CustomSlider";
import NewsSliderItem from "./components/NewsSliderItem";
import newsService from "@/services/news.service";
import { INews } from "@/shared/types/news.types";
import { INewsItem } from "./types";
import { UPLOADS_URL } from "@/constants";

const ReadMoreScreen: FC = () => {
  // Добавляем маппер категорий
  const categoryMap: Record<string, string> = {
    all: "Все",
    production: "Производство",
    technology: "Технологии",
    events: "События",
    interview: "Интервью",
    developments: "Разработки",
    useful: "Полезное",
    projects: "Наши проекты",
  };

  const {
    data: news = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      const { data } = await newsService.fetchAll();
      return data;
    },
  });

  // Transform API data to match the expected format
  const transformedNews: INewsItem[] = news.map((item: INews) => ({
    id: parseInt(item.id),
    category: categoryMap[item.category] || item.category,
    date: item.date ? new Date(item.date).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }) : "",
    readTime: `${item.readingTime} мин`,
    title: item.title,
    description: item.shortContent || item.content.substring(0, 150) + "...",
    shortContent: item.shortContent,
    image: `${UPLOADS_URL}/${item.imageUrl}` || "/news_bg.webp",
    link: `/news/${item.slug}`,
  }));

  if (isLoading) {
    return (
      <section className="py-20">
        <CustomContainer>
          <SectionHeader
            bracketsText="НОВОСТИ"
            heading={<>Читайте также</>}
            description="Будьте в курсе последних событий компании: важные обновления, достижения команды и интересные проекты, которые формируют наше будущее."
            desktopOrder={{
              bracketsText: 1,
              heading: 2,
              description: 3,
            }}
          />
          <div className="flex justify-center items-center h-40">
            <div className="text-gray-500">Загрузка новостей...</div>
          </div>
        </CustomContainer>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20">
        <CustomContainer>
          <SectionHeader
            bracketsText="НОВОСТИ"
            heading={<>Читайте также</>}
            description="Будьте в курсе последних событий компании: важные обновления, достижения команды и интересные проекты, которые формируют наше будущее."
            desktopOrder={{
              bracketsText: 1,
              heading: 2,
              description: 3,
            }}
          />
          <div className="flex justify-center items-center h-40">
            <div className="text-red-500">Ошибка загрузки новостей</div>
          </div>
        </CustomContainer>
      </section>
    );
  }

  return (
    <section className="py-20">
      <CustomContainer>
        <SectionHeader
          bracketsText="НОВОСТИ"
          heading={<>Читайте также</>}
          description="Будьте в курсе последних событий компании: важные обновления, достижения команды и интересные проекты, которые формируют наше будущее."
          desktopOrder={{
            bracketsText: 1,
            heading: 2,
            description: 3,
          }}
        />

        <CustomSlider
          autoplay={false}
          spaceBetween={24}
          breakpoints={{
            300: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1400: {
              slidesPerView: 4,
            },
          }}
        >
          {transformedNews.map((item) => (
            <NewsSliderItem key={item.id} item={item} />
          ))}
        </CustomSlider>
      </CustomContainer>
    </section>
  );
};

export default ReadMoreScreen;
