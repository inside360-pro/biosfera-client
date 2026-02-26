"use client";
import Image from "next/image";
import {
  AnimateElement,
  ContentRenderer,
  CostItem,
} from "@/app/components";
import { usePopupStore } from "@/app/store/popupStore";
import type {
  CostItemType,
  SliderItemType,
  IncludesItemType,
} from "@/app/types";
import Accordion from "@/app/components/Accordion/Accordion";

import styles from "../style.module.scss";

export interface SliderProps {
  items: SliderItemType[];
}

export interface RecomendationsItemType {
  id: number;
  title: string;
}
export default function ContentPage({ data }: { data: any }) {
  const { togglePopupState } = usePopupStore();
  const hero = data?.data?.[0];
  const prices = data?.data?.[0]?.prices?.[0]?.item;
  const faq = data?.data?.[0]?.faq;
  const seo_block = data?.data?.[0]?.seo_block;
  const recomendations = data?.data?.[0]?.section;
  const how = data?.data?.[0]?.how;

  console.log("how", how);

  return (
    <>
      <h1 className="visually-hidden">{hero?.hero_title}</h1>
      <section className={`${styles.services__hero} ${styles.section}`}>
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

      <section className={`${styles.costs} ${styles.section}`}>
        <div className="container">
          <header className={styles.costs__header}>
            <h2 className={styles.costs__title}>
              <span className="text-gradient">Стоимость </span>услуг
            </h2>
            <p>
              Точная стоимость услуг уточняется при записи.Назначение
              дополнительных обследований возможно только после консультации
              врача и по медицинским показаниям.
            </p>
          </header>

          <ul className={styles.costs__list}>
            {prices?.map((item: CostItemType) => (
              <CostItem key={item.id} data={item} />
            ))}
          </ul>
        </div>
      </section>

      <section className={`${styles.recomendations} ${styles.section}`}>
        <div className="container">
          <h2 className={styles.secton_title} dangerouslySetInnerHTML={{ __html: recomendations?.title ?? "" }}></h2>

          <div className={styles.recomendations__wrapper}>
            <div className={styles.recomendations__block}>
              <ul className={styles.recomendations__list}>
                {recomendations?.list?.map((item: RecomendationsItemType) => (
                  <li key={item.id} className={styles.recomendations__item}>
                    <svg
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>check-icon</title>
                      <path
                        d="M12.5 0.537109C5.89307 0.537109 0.537109 5.89307 0.537109 12.5C0.537109 19.1069 5.89307 24.4629 12.5 24.4629C19.1069 24.4629 24.4629 19.1069 24.4629 12.5C24.4629 5.89307 19.1069 0.537109 12.5 0.537109ZM11.0267 5.79829C11.0267 5.40896 11.1814 5.03558 11.4567 4.76028C11.732 4.48498 12.1053 4.33032 12.4947 4.33032C12.884 4.33032 13.2574 4.48498 13.5327 4.76028C13.808 5.03557 13.9627 5.40896 13.9627 5.79829V14.2978C13.9627 14.6871 13.808 15.0605 13.5327 15.3358C13.2574 15.6111 12.884 15.7658 12.4947 15.7658C12.1053 15.7658 11.732 15.6111 11.4567 15.3358C11.1814 15.0605 11.0267 14.6871 11.0267 14.2978V5.79829ZM13.7872 20.1325C13.4903 20.4254 13.1011 20.6063 12.6859 20.6446C12.2707 20.6829 11.855 20.5762 11.5096 20.3427C11.1641 20.1091 10.9103 19.7631 10.7912 19.3634C10.672 18.9638 10.695 18.5353 10.8562 18.1507C11.0174 17.7661 11.3068 17.4492 11.6752 17.2539C12.0436 17.0587 12.4683 16.997 12.8771 17.0795C13.2858 17.162 13.6534 17.3835 13.9172 17.7064C14.1811 18.0293 14.325 18.4336 14.3244 18.8506C14.3264 19.0896 14.2798 19.3264 14.1874 19.5467C14.0951 19.7671 13.9589 19.9664 13.7872 20.1325V20.1325Z"
                        fill="white"
                      />
                    </svg>
                    <p>{item.title}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.recomendations__image}>
              <Image
                src={`${process.env.NEXT_PUBLIC_API_SERVER}${recomendations?.image?.url}`}
                alt={data?.data?.[0]?.recomendations_image?.alt ?? "alt text"}
                width={704}
                height={608}
                className="dsv-image"
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MiIgaGVpZ2h0PSIxMTg5IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNjY2MiIC8+PC9zdmc+"
              />
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.how}`}>
        <div className={styles.how_background}>
          <div className="container">
            <h2 className={styles.secton_title} dangerouslySetInnerHTML={{ __html: how?.title ?? "" }}></h2>
            <div className={styles.how_content__wrapper}>
              <div className={styles.recomendations__image}>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_SERVER}${how?.image?.url}`}
                    alt={data?.data?.[0]?.how?.alt ?? "alt text"}
                    width={528}
                    height={375}
                    className="dsv-image"
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MiIgaGVpZ2h0PSIxMTg5IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNjY2MiIC8+PC9zdmc+"
                  />
              </div>
              <div className={styles.how_content__text}>
                <ContentRenderer content={how?.content ?? []} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <header className={styles.faq__header}>
            <h2 className={styles.secton_title}>
              Часто задаваемые <span className="text-gradient">вопросы</span>
            </h2>
            <p>
              Если вы не нашли нужную информацию — вы всегда можете задать
              вопрос администратору или врачу
            </p>
          </header>
          <Accordion list={faq?.list ?? []} />
        </div>
      </section>

      <section className={`${styles.seo_block} ${styles.section}`}>
        <div className="container">
          <header className={styles.seo_block__header}>
            <h2 className={styles.secton_title}>
              <span className="text-gradient">SEO текст</span>
            </h2>
          </header>
          <ContentRenderer content={seo_block?.content ?? []} />
        </div>
      </section>
    </>
  );
}
