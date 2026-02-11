"use client";

import Image from "next/image";
import { usePopupStore } from "@/app/store/popupStore";
import { AnimateElement } from "@/app/components";
import styles from "./style.module.scss";

export default function Owner() {
  const { togglePopupState } = usePopupStore();

  return (
    <section className={styles.owner}>
      <div className="container">
        <div className={styles.owner_wrapper}>
          <div className={styles.owner__qoutes}>
            <Image
              src="/images/quotes.svg"
              className="dsv-image"
              alt="quotes"
              width={68}
              height={78}
            />
          </div>

          <div className={styles.owner__descriptions}>
            <AnimateElement element="p">
              Каждый день я вижу, с какими сомнениями и вопросами люди приходят
              в клинику. Именно поэтому для нас так важно не просто поставить
              диагноз, а подробно объяснить, что происходит и какие шаги
              действительно помогут.
            </AnimateElement>

            <AnimateElement element="p" animationDelay={50}>
              В «Биосфере ДВ» мы работаем командой — врачи, диагностика,
              сопровождение. Мы не торопим пациента и не принимаем решений
              вслепую. Наша цель — чтобы после визита у вас осталось не чувство
              тревоги, а понимание и уверенность в дальнейших действиях.
            </AnimateElement>

            <AnimateElement
              element="p"
              animationDelay={100}
              className="text-gradient"
            >
              Мы берём ответственность за рекомендации, которые даём, и за
              результат, к которому ведём пациента.
            </AnimateElement>
          </div>

          <AnimateElement animationName="fadeRight" animationDelay={150}>
            <div className={styles.owner__image}>
              <Image
                src="/images/image.webp"
                className="dsv-image"
                alt="Owner"
                width={439}
                height={439}
              />
            </div>
          </AnimateElement>

          <div className={styles.owner__content}>
            <h3 className={styles.owner__title}>
              Бурдуковская Наталья Викторовна
            </h3>
            <p className={styles.owner__position}>Главный врач</p>
          </div>

          <div className={styles.owner__button}>
            <button
              type="button"
              className={styles.primary_button}
              onClick={togglePopupState}
            >
              Задать вопрос главному врачу
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
