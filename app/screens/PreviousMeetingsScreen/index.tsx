"use client";

import { FC } from "react";
import CustomContainer from "@/components/ui/CustomContainer";
import SectionHeader from "@/components/ui/SectionHeader";
import Image from "next/image";
import "swiper/css";
import "swiper/css/free-mode";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";

const PreviousMeetingsScreen: FC = () => {
  // Плейсхолдеры для предыдущих встреч (увеличим количество для плавной прокрутки)
  const meetings = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: `Встреча ${(i % 6) + 1}`,
    image: "/construction_bg.webp", // Плейсхолдер изображения
  }));

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-transparent">
      <CustomContainer>
        <SectionHeader
          bracketsText="КАК ЭТО БЫЛО"
          heading={
            <>
              Посмотрите, как проходили
              <br />
              предыдущие встречи
            </>
          }
          description="Насыщенная деловая программа, атмосфера профессионального общения, много полезной информации "
          desktopOrder={{
            bracketsText: 3,
            heading: 1,
            description: 2,
          }}
        />
      </CustomContainer>

      {/* Full-width Slider with 3 rows */}
      <div className="mt-8 md:mt-12 w-[100vw] overflow-hidden relative select-none" style={{ left: '50%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw', pointerEvents: 'none', userSelect: 'none' }}>
        <Swiper
          modules={[Autoplay, FreeMode]}
          spaceBetween={8}
          slidesPerView={2}
          loop={true}
          freeMode={true}
          allowTouchMove={false}
          noSwiping={true}
          noSwipingClass="swiper-no-swiping"
          autoplay={{
            delay: 1,
            disableOnInteraction: false,
          }}
          speed={30000}
          breakpoints={{
            640: {
              slidesPerView: 2.5,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 12,
            },
            1024: {
              slidesPerView: 3.5,
              spaceBetween: 16,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
          className="previous-meetings-swiper"
          style={{ pointerEvents: 'none', userSelect: 'none', touchAction: 'none' }}
        >
          {meetings.map((meeting) => (
            <SwiperSlide key={meeting.id}>
              <div className="relative w-full aspect-video overflow-hidden">
                <Image
                  src={meeting.image}
                  alt={meeting.title}
                  fill
                  className="object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Second row */}
        <Swiper
          modules={[Autoplay, FreeMode]}
          spaceBetween={8}
          slidesPerView={2}
          loop={true}
          freeMode={true}
          allowTouchMove={false}
          noSwiping={true}
          noSwipingClass="swiper-no-swiping"
          autoplay={{
            delay: 1,
            disableOnInteraction: false,
            reverseDirection: true,
          }}
          speed={30000}
          breakpoints={{
            640: {
              slidesPerView: 2.5,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 12,
            },
            1024: {
              slidesPerView: 3.5,
              spaceBetween: 16,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
          className="previous-meetings-swiper mt-2 md:mt-4"
          style={{ pointerEvents: 'none', userSelect: 'none', touchAction: 'none' }}
        >
          {meetings.map((meeting) => (
            <SwiperSlide key={`${meeting.id}-row2`}>
              <div className="relative w-full aspect-video overflow-hidden">
                <Image
                  src={meeting.image}
                  alt={meeting.title}
                  fill
                  className="object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Third row */}
        <Swiper
          modules={[Autoplay, FreeMode]}
          spaceBetween={8}
          slidesPerView={2}
          loop={true}
          freeMode={true}
          allowTouchMove={false}
          noSwiping={true}
          noSwipingClass="swiper-no-swiping"
          autoplay={{
            delay: 1,
            disableOnInteraction: false,
          }}
          speed={30000}
          breakpoints={{
            640: {
              slidesPerView: 2.5,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 12,
            },
            1024: {
              slidesPerView: 3.5,
              spaceBetween: 16,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
          className="previous-meetings-swiper mt-2 md:mt-4"
          style={{ pointerEvents: 'none', userSelect: 'none', touchAction: 'none' }}
        >
          {meetings.map((meeting) => (
            <SwiperSlide key={`${meeting.id}-row3`}>
              <div className="relative w-full aspect-video overflow-hidden">
                <Image
                  src={meeting.image}
                  alt={meeting.title}
                  fill
                  className="object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default PreviousMeetingsScreen;

