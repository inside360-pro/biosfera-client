"use client";

import styles from "./style.module.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperNavButtons from "../SwiperNavButtons/SwiperNavButtons";
import Image from "next/image";
import Link from "next/link";

import { AnimateElement, ContentRenderer } from "@/app/components";
import type { SliderItemType } from "@/app/types";

import "swiper/css";
import "swiper/css/navigation";

export default function SliderServices({ items }: { items: SliderItemType[] }) {
  console.log(items);

  return (
    <div className={`${styles.wrapper}`}>
      <Swiper>
        {items &&
          items.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className={styles.slider__item}>
                <div className="container">
                  <div className={styles.item_wrapper}>
                    <div className={styles.item_content}>
                      <ContentRenderer content={slide?.content ?? []} />
                      <AnimateElement animationDelay={100}>
                        <Link
                          href={slide?.link ?? ""}
                          className={styles.item__link}
                        >
                          Узнать подробнее
                        </Link>
                      </AnimateElement>
                    </div>

                    <div className={styles.slider__item_image}>
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_SERVER}${slide?.image?.[0]?.url}`}
                        alt="slider-1"
                        width={405}
                        height={478}
                        className="dsv-image"
                        placeholder="blur"
                        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MiIgaGVpZ2h0PSIxMTg5IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNjY2MiIC8+PC9zdmc+"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        {items && items.length > 1 && (
          <SwiperNavButtons addClass={"buttons_bottom"} />
        )}
      </Swiper>
    </div>
  );
}
