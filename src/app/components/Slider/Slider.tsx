"use client";
import type { ComponentType, Key } from "react";
import styles from "./style.module.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperNavButtons from "../SwiperNavButtons/SwiperNavButtons";

import "swiper/css";
import "swiper/css/navigation";

type SliderBreakpoints = Record<
  number,
  {
    slidesPerView?: number;
    spaceBetween?: number;
    [key: string]: any;
  }
>;

type SliderProps<TItem> = {
  data: TItem[];
  Card: ComponentType<{ data: TItem }>;
  getKey?: (item: TItem, index: number) => Key;
  breakpoints?: SliderBreakpoints;
  slidesPerView?: number;
  slidesPerGroup?: number;
  spaceBetween?: number;
  loop?: boolean;
  breakpointsBase?: "window" | "container";
};

// 4 карточки
const DEFAULT_BREAKPOINTS: SliderBreakpoints = {
  0: { slidesPerView: 2, slidesPerGroup: 2 },
  768: { slidesPerView: 2, slidesPerGroup: 2 },
  1023: { slidesPerView: 3 },
  1440: { slidesPerView: 4 },
};

// 3 карточки
const DEFAULT_BREAKPOINTS_3: SliderBreakpoints = {
  0: { slidesPerView: 2, slidesPerGroup: 2 },
  768: { slidesPerView: 2, slidesPerGroup: 2 },
  1023: { slidesPerView: 3 },
};

export default function Slider<TItem>({
  data,
  Card,
  breakpoints,
  slidesPerView,
  slidesPerGroup,
  spaceBetween = 20,
  loop = true,
  breakpointsBase = "container",
}: SliderProps<TItem>) {
  const resolvedBreakpoints =
    breakpoints ??
    (slidesPerView === 3 ? DEFAULT_BREAKPOINTS_3 : DEFAULT_BREAKPOINTS);

  const swiperBaseProps = {
    spaceBetween,
    loop,
    modules: [Navigation],
    breakpoints: resolvedBreakpoints,
    breakpointsBase,
    observer: true,
    observeParents: true,
  };

  return (
    <div className={`${styles.about_wrapper}`}>
      <Swiper
        {...swiperBaseProps}
        {...(slidesPerView !== undefined ? { slidesPerView } : {})}
        {...(slidesPerGroup !== undefined ? { slidesPerGroup } : {})}
      >
        {data?.length > 0 &&
          data?.map((item, index) => (
            <SwiperSlide key={index}>
              <Card data={item} />
            </SwiperSlide>
          ))}

        <SwiperNavButtons addClass={"buttons_bottom"} />
      </Swiper>
    </div>
  );
}
