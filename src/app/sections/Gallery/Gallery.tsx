"use client";
import { AnimateElement, SliderGallery } from "@/app/components";
import styles from "./style.module.scss";

export default function Gallery() {
  return (
    <section className={styles.gallery}>
      <div className="container">
        <div className={styles.gallery__wrapper}>
          <div className={styles.gallery__header}>
            <AnimateElement element="h2">Галерея</AnimateElement>
            <AnimateElement element="p" animationDelay={100}>
              Мы создаём спокойную и комфортную среду, в которой пациент
              чувствует себя уверенно и безопасно
            </AnimateElement>
          </div>
          <SliderGallery />
        </div>
      </div>
    </section>
  );
}
