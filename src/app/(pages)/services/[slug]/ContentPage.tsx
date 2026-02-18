"use client";
import Image from "next/image";
import {
  AnimateElement,
  ContentRenderer,
  CostItem,
  SliderServices,
} from "@/app/components";
import { usePopupStore } from "@/app/store/popupStore";
import styles from "./style.module.scss";
import type { CostItemType } from "@/app/types";

export default function ContentPage({ data }: { data: any }) {
  const { togglePopupState } = usePopupStore();
  const hero = data?.data?.[0];
  const prices = data?.data?.[0]?.prices?.[0]?.item;
  const services_slider = data?.data?.[0]?.services_slider;

  console.log(services_slider);

  return (
    <>
      <section className={styles.services__hero}>
        <div className={styles.services__hero_image}>
          <Image
            src={`${process.env.NEXT_PUBLIC_API_SERVER}${hero?.hero_background?.url}`}
            alt={hero?.hero_title}
            width={1740}
            height={639}
            className="dsv-image"
            priority
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MiIgaGVpZ2h0PSIxMTg5IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNjY2MiIC8+PC9zdmc+"
          />
        </div>

        <div className={styles.services__hero_wrapper}>
          <div className="container">
            <h2 className={styles.hero_title}>{hero?.hero_title}</h2>
            <ContentRenderer content={hero?.hero_description ?? []} />
          </div>

          <div className={styles.services__hero_button_wrapper}>
            <svg
              width="435"
              height="93"
              viewBox="0 0 435 93"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.hero_button_bg}
            >
              <title>arrow-icon</title>
              <path
                d="M4.56609e-05 92.7208C7.18294 92.7043 21.4507 89.0879 21.4507 74.7209V47.7209C23.1173 32.0542 34.3507 0.620861 65.9507 0.220861C97.5507 -0.179139 275.784 0.054194 360.951 0.220861C375.784 0.387475 406.551 9.2207 410.951 43.2207V74.7207C411.435 80.5325 416.611 91.8802 433.294 92.2226L434.951 92.2207C434.386 92.2332 433.834 92.2337 433.294 92.2226L4.56609e-05 92.7208Z"
                fill="white"
              />
            </svg>

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
        </div>
      </section>

      <section className={styles.costs}>
        <div className="container">
          <header className={styles.costs__header}>
            <h2 className={styles.costs__title}>
              <span className="text-gradient">Стоимость</span>услуг
            </h2>
            <p>
              Точная стоимость услуг уточняется при записи.Назначение
              дополнительных обследований возможно только после консультации
              врача и по медицинским показаниям.
            </p>
          </header>

          <ul className={styles.costs__list}>
            {prices.map((item: CostItemType) => (
              <CostItem key={item.id} data={item} />
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.slider}>
        <SliderServices />
      </section>
    </>
  );
}
