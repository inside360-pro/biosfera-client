"use client";
import { useState, useEffect } from "react";
import styles from "./style.module.scss";
import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperNavButtons from "../SwiperNavButtons/SwiperNavButtons";

import "swiper/css";
import "swiper/css/navigation";

import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";

const imageList = [
  { url: "/images/slide-1.webp" },
  { url: "/images/slide-2.webp" },
  { url: "/images/slide-3.webp" },
  { url: "/images/slide-1.webp" },
  { url: "/images/slide-2.webp" },
  { url: "/images/slide-3.webp" },
];

export default function SliderGallery() {
  const domain = process.env.NEXT_PUBLIC_DOMAIN;

  useEffect(() => {
    let lightbox = new PhotoSwipeLightbox({
      gallery: "#main-gallery",
      children: ".swiper .swiper-slide a",
      pswpModule: () => import("photoswipe"),
    });
    lightbox.init();

    return () => {
      lightbox.destroy();
      // lightbox = null;
    };
  }, []);

  return (
    <div
      id="main-gallery"
      className={`${styles.about_wrapper} about_wrapper pswp-gallery`}
    >
      <Swiper
        spaceBetween={20}
        loop={true}
        modules={[Navigation]}
        breakpoints={{
          320: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1023: { slidesPerView: 3 },
        }}
      >
        {imageList?.length > 0 ? (
          imageList.map((item, index) => (
            <SwiperSlide key={index}>
              <div className={styles.image_slide}>
                <a
                  href={`${item?.url}`}
                  data-pswp-width={480 * 2}
                  data-pswp-height={425 * 2}
                  key={"#main-gallery" + "-" + 1}
                  target="_blank"
                  rel="noreferrer"
                  className={`${styles.img_wrapper} dsv-image`}
                >
                  <div className={styles.image_wrapper}>
                    <Image
                      src={`${item?.url}`}
                      alt="Dubrovina logo"
                      width={480}
                      height={425}
                      className="dsv-image"
                      placeholder="blur"
                      blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MiIgaGVpZ2h0PSIxMTg5IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNjY2MiIC8+PC9zdmc+"
                      priority
                    />
                  </div>
                </a>
              </div>
            </SwiperSlide>
          ))
        ) : (
          <p>данные не заполнены</p>
        )}

        <SwiperNavButtons addClass={"buttons_bottom"} />
      </Swiper>
    </div>
  );
}
