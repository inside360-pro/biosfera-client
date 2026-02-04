"use client";
import { useSwiper } from "swiper/react";
import styles from './style.module.css'

const SwiperNavButtons = ({ addClass }) => {
    const swiper = useSwiper();

    return (
        <div className={`${styles.swiper_nav_btns} ${addClass} ${addClass ? styles[addClass] : ''
            }`}>
            <button className={styles.btn_prev} onClick={() => swiper.slidePrev()}>
                <svg width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.2491 10.7807L1.41402 11.0547M1.41402 11.0547L11.1946 1.00001M1.41402 11.0547L10.5944 19.9848" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
            </button>

            <button className={styles.btn_next} onClick={() => swiper.slideNext()}>
                <svg width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.999915 10.7807L20.835 11.0547M20.835 11.0547L11.0545 1.00001M20.835 11.0547L11.6547 19.9848" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
            </button>
        </div>
    )
}

export default SwiperNavButtons;

