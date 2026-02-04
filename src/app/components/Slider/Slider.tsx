"use client";
import { useState, useEffect } from "react";
import styles from "./style.module.scss";
import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules'
import SwiperNavButtons from "../SwiperNavButtons/SwiperNavButtons";

import 'swiper/css';
import 'swiper/css/navigation';

export default function Slider() {


    return (
        <div className={`${styles.about_wrapper}`}>
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

                <SwiperSlide>1</SwiperSlide>
                <SwiperSlide>2</SwiperSlide>
                <SwiperSlide>3</SwiperSlide>
                <SwiperSlide>4</SwiperSlide>
                <SwiperSlide>5</SwiperSlide>

                <SwiperNavButtons
                    addClass={'buttons_bottom'}
                />
            </Swiper>
        </div>
    )
}