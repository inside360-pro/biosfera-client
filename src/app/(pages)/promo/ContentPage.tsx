"use client";

import { ContentRenderer } from "@/app/components";
import styles from "./style.module.scss";
import Image from "next/image";
import PromoButton from "./button";

import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";
import SwiperNavButtons from "@/app/components/SwiperNavButtons/SwiperNavButtons";

import { ContentItem } from "@/app/components/ContentRenderer/ContentRenderer";

type PromoItem = {
  id: number;
  title?: string | null;
  description?: ContentItem[] | null;
  image?: { url?: string | null } | null;
  okonchaniye?: string | null;
};

const domain = process.env.NEXT_PUBLIC_API_SERVER ?? "";

export default function ContentPage({ data }: { data: PromoItem[] }) {
  const swiperBaseProps = {
    spaceBetween: 20,
    slidesPerView: 3,
    loop: true,
    breakpoints: {
      1024: {
        slidesPerView: 3,
      },
      600: {
        slidesPerView: 2,
      },
      320: {
        slidesPerView: 1,
      },
    },
  } as SwiperProps;

  return (
    <Swiper {...swiperBaseProps} className={styles.promo_slider}>
      {data.map((item) => (
        <SwiperSlide key={item.id}>
          <div className={styles.promo_item_content}>
            <div>
              <div className={styles.promo_image}>
                <Image
                  className="dsv-image"
                  src={
                    item.image?.url
                      ? `${domain}${item.image.url}`
                      : "/placeholder1.svg"
                  }
                  alt="Promo"
                  width={288}
                  height={180}
                />
              </div>
              <h3 className={`${styles.promo_item_title} text-gradient`}>
                {item.title}
              </h3>
              <ContentRenderer content={item.description ?? []} />
            </div>
            <PromoButton />
          </div>
        </SwiperSlide>
      ))}
      {data && data.length > 1 && (
        <SwiperNavButtons addClass={"buttons_bottom"} />
      )}
    </Swiper>
  );
}
