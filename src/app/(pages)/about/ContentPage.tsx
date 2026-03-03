"use client";
import Image from "next/image";
import {
  AnimateElement,
  ContentRenderer,
  CostItem,
  PriceForm,
  SliderServices,
} from "@/app/components";
import { usePopupStore } from "@/app/store/popupStore";
import styles from "./style.module.scss";
import type {
  CostItemType,
  SliderItemType,
  IncludesItemType,
} from "@/app/types";
import Accordion from "@/app/components/Accordion/Accordion";
import Gallery from "@/app/sections/Gallery/Gallery";
import { Owner, About } from "@/app/sections";

export interface SliderProps {
  items: SliderItemType[];
}

export interface RecomendationsItemType {
  id: number;
  title: string;
}
export default function ContentPage({ data }: { data: any }) {
  const { togglePopupState } = usePopupStore();
  const faq = data?.faq;
  const gallery = data?.gallery;
  const licenses = data?.licenses;

  const { about_section, about_image_l, about_image_s } = data;

  return (
    <>
      <section className={`${styles.services__hero} ${styles.section}`}>
        <div className={styles.services__hero_image}>
          <Image
            src={`${process.env.NEXT_PUBLIC_API_SERVER}${data?.hero_background?.url}`}
            alt={data?.hero_title}
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
            <h2 className={styles.hero_title}>{data?.hero_title}</h2>
            <ContentRenderer content={data?.hero_description ?? []} />
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

      {gallery && gallery.length > 0 && <Gallery images={gallery ?? []} />}

      <Owner />

      <About
        data={about_section}
        image_l={about_image_l}
        image_s={about_image_s}
      />

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
          <Accordion list={faq?.[0]?.list ?? []} />
        </div>
      </section>

      <section className={`${styles.price} ${styles.section}`}>
        <div className="container">
          <PriceForm />
        </div>
      </section>

      <section className={`${styles.section} ${styles.licenses}`}>
        <div className="container">
          <div className={styles.licenses_wrapper}>
            <div className={styles.licenses_content}>
              <h2 className={styles.secton_title}>
                {licenses?.title ?? "Лицензии"}
              </h2>
              <p className={styles.description}>
                {licenses?.description ?? ""}
              </p>
              <div className={styles.licenses_block}>
                <p>
                  Лицензия:{" "}
                  <span className="text-gradient">
                    {licenses?.number ?? ""}
                  </span>
                </p>
                <p>
                  Дата выдачи:{" "}
                  <span className="text-gradient">{licenses?.data ?? ""}</span>
                </p>

                <a
                  className={styles.licenses_button}
                  href={
                    licenses.view.url
                      ? `${process.env.NEXT_PUBLIC_API_SERVER}${licenses?.view?.url}`
                      : "#"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ознакомиться с лицензией
                </a>
              </div>
            </div>
            <div className={styles.licenses_images}>
              {licenses?.images?.length > 0 &&
                licenses?.images?.map((image: any) => (
                  <Image
                    key={image.id}
                    src={`${process.env.NEXT_PUBLIC_API_SERVER}${image?.url}`}
                    alt={image?.name ?? "licenses_images"}
                    width={335}
                    height={510}
                    className="dsv-image"
                    priority
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MiIgaGVpZ2h0PSIxMTg5IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNjY2MiIC8+PC9zdmc+"
                  />
                ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
