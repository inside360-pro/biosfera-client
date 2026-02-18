"use client";
import type { ComponentType, Key } from "react";
import styles from "./style.module.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperNavButtons from "../SwiperNavButtons/SwiperNavButtons";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";

export default function SliderServices() {
  return (
    <div className={`${styles.about_wrapper}`}>
      <Swiper>
        <SwiperSlide>
          <div className={styles.slider__item}>
            <div className={styles.slider__item_content}>
              <h3 className={styles.slider__item_title}>
                <span className={styles.slider__item_title_span}>1</span>
              </h3>
            </div>
            <div className={styles.slider__item_image}>
              <Image
                src="/images/services/slider-1.jpg"
                alt="slider-1"
                width={100}
                height={100}
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperNavButtons addClass={"buttons_bottom"} />
      </Swiper>
    </div>
  );
}
