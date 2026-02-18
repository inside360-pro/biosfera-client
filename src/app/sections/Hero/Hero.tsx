"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { usePopupStore } from "@/app/store/popupStore";
import { AnimateElement } from "@/app/components";
import styles from "./style.module.scss";

export default function Hero() {
  const [miniPopupClosed, setMiniPopupClosed] = useState(true);
  const { togglePopupState } = usePopupStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setMiniPopupClosed(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const miniPopupCloseHandler = () => {
    setMiniPopupClosed(true);
    togglePopupState();
  };

  return (
    <section>
      <div className={styles.hero_wrapper}>
        <Image
          src="/images/hero-bg.webp"
          alt="bg-image"
          width={1740}
          height={766}
          className={`${styles.hero_bg} dsv-image`}
          priority
        />
        <div className={styles.hero_content}>
          <AnimateElement
            element="h2"
            animationName="fadeUp"
            className={styles.hero_title}
          >
            «Биосфера ДВ» — забота о&nbsp;вашем здоровье на всех этапах
          </AnimateElement>
          <AnimateElement animationDelay={100}>
            <button
              className={styles.hero_button}
              onClick={togglePopupState}
              type="button"
            >
              Записаться на прием
            </button>
          </AnimateElement>
        </div>

        <div className={`${styles.hero_ladel} ${styles.hero_ladel_1}`}>
          <Image
            src="/icons/plus-icon.svg"
            alt="plus-icon"
            width={30}
            height={30}
          />
          <p>Комфортный приём без очередей и потери времени</p>
        </div>
        <div className={`${styles.hero_ladel} ${styles.hero_ladel_2}`}>
          <Image
            src="/icons/plus-icon.svg"
            alt="plus-icon"
            width={30}
            height={30}
          />
          <p>Точная диагностика без лишних назначений</p>
        </div>
        <div className={`${styles.hero_ladel} ${styles.hero_ladel_3}`}>
          <Image
            src="/icons/plus-icon.svg"
            alt="plus-icon"
            width={30}
            height={30}
          />
          <p>Врачи, которые разбираются в&nbsp;причине, а не лечат симптомы</p>
        </div>
        {/* <a className={styles.hero_link} href="#" target="_blank">
          Записаться онлайн
        </a> */}
        <button
          type="button"
          className={styles.scroll_down_button}
          onClick={() => {
            const servicesSection = document.getElementById("services");
            if (servicesSection) {
              servicesSection.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          <Image src="/icons/down.svg" alt="plus-icon" width={30} height={20} />
        </button>
      </div>

      {!miniPopupClosed && (
        <section className={styles.mini_popup}>
          <button
            type="button"
            onClick={() => setMiniPopupClosed(true)}
            className={styles.mini_popup_close_button}
          >
            <Image
              src="/icons/close-small.svg"
              alt="bg-image"
              width={22}
              height={22}
            />
          </button>
          <div className={styles.mini_popup_content}>
            <h2>Есть вопросы?</h2>
            <p>Мы перезвоним вам в течение нескольких минут</p>
            <button
              type="button"
              className={`${styles.hero_button} ${styles.hero_button_small}`}
              onClick={miniPopupCloseHandler}
            >
              Записаться на прием
            </button>
          </div>
        </section>
      )}
    </section>
  );
}
