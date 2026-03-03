"use client";

import Image from "next/image";
import { AnimateElement } from "@/app/components";
import styles from "./style.module.scss";

export default function About({
  data,
  image_l,
  image_s,
}: {
  data: Array<{
    title: string;
    description: string;
  }>;
  image_l: { url: string };
  image_s: { url: string };
}) {
  return (
    <section className={styles.about}>
      <div className="container">
        <ul className={styles.about__wrapper}>
          <li className={styles.about__item}>
            <h3>{data[0]?.title}</h3>
            <p>{data[0]?.description}</p>
            <Image
              className={styles.about__item_svg}
              src={"/icons/about-icon-1.svg"}
              alt="icon"
              width={46}
              height={46}
            />
            <Image
              className={styles.about__item_svg_mobile}
              src={"/icons/ellipse.svg"}
              alt="icon"
              width={16}
              height={16}
            />
          </li>
          <li className={styles.about__item}>
            <h3>{data[1]?.title}</h3>
            <p>{data[1]?.description}</p>
            <Image
              className={styles.about__item_svg}
              src={"/icons/about-icon-3.svg"}
              alt="icon"
              width={46}
              height={46}
            />
            <Image
              className={styles.about__item_svg_mobile}
              src={"/icons/ellipse.svg"}
              alt="icon"
              width={16}
              height={16}
            />
          </li>
          <li className={`${styles.about__item} ${styles.about__item_info}`}>
            <AnimateElement element="h2">{data[2]?.title}</AnimateElement>
            <AnimateElement element="p" animationDelay={100}>
              {data[2]?.description}
            </AnimateElement>
            <Image
              className={styles.about__item_info_img}
              // src={"/images/info.webp"}
              src={
                image_l?.url
                  ? `${process.env.NEXT_PUBLIC_API_SERVER}${image_l?.url}`
                  : "/images/info.webp"
              }
              alt="icon"
              width={650}
              height={650}
            />
            <Image
              className={styles.about__item_info_img_mobile}
              // src={"/images/about-2.webp"}
              src={
                image_s?.url
                  ? `${process.env.NEXT_PUBLIC_API_SERVER}${image_s?.url}`
                  : "/images/about-2.webp"
              }
              alt="icon"
              width={650}
              height={650}
            />
          </li>
          <li className={styles.about__item}>
            <h3>{data[3]?.title}</h3>
            <p>{data[3]?.description}</p>
            <Image
              className={styles.about__item_svg}
              src={"/icons/about-icon-2.svg"}
              alt="icon"
              width={46}
              height={46}
            />
            <Image
              className={styles.about__item_svg_mobile}
              src={"/icons/ellipse.svg"}
              alt="icon"
              width={16}
              height={16}
            />
          </li>
          <li className={styles.about__item}>
            <h3>{data[4]?.title}</h3>
            <p>{data[4]?.description}</p>
            <Image
              className={styles.about__item_svg}
              src={"/icons/about-icon-4.svg"}
              alt="icon"
              width={46}
              height={46}
            />
            <Image
              className={styles.about__item_svg_mobile}
              src={"/icons/ellipse.svg"}
              alt="icon"
              width={16}
              height={16}
            />
          </li>
        </ul>
      </div>
    </section>
  );
}
