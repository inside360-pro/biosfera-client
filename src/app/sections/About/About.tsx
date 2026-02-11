"use client";

import Image from "next/image";
import { AnimateElement } from "@/app/components";
import styles from "./style.module.scss";

export default function About() {
  return (
    <section className={styles.about}>
      <div className="container">
        <ul className={styles.about__wrapper}>
          <li className={styles.about__item}>
            <h3>Честная медицина</h3>
            <p>
              Мы не увеличиваем чек за счёт ненужных анализов и
              процедур.Назначения делаются только тогда, когда они действительно
              обоснованы.
            </p>
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
            <h3>Комфорт и уважение</h3>
            <p>
              Мы строим сервис вокруг пациента - чёткая запись, соблюдение
              времени приёма, спокойная атмосфера для эффективного лечения
            </p>
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
            <AnimateElement element="h2">
              Центр здоровья и&nbsp;инноваций
            </AnimateElement>
            <AnimateElement element="p" animationDelay={100}>
              Мы — медицинский центр, который ставит вашего здоровья и комфорт
              на первое место. Объединяя высококвалифицированных специалистов с
              передовыми технологиями, мы предлагаем вам качественное
              обслуживание. В нашем центре нет стандартных решений — мы работаем
              для того, чтобы каждый пациент получил необходимое и своевременное
              лечение.
            </AnimateElement>
            <Image
              className={styles.about__item_info_img}
              src={"/images/info.webp"}
              alt="icon"
              width={650}
              height={650}
            />
            <Image
              className={styles.about__item_info_img_mobile}
              src={"/images/about-2.webp"}
              alt="icon"
              width={650}
              height={650}
            />
          </li>
          <li className={styles.about__item}>
            <h3>Телемедицина</h3>
            <p>
              Онлайн-консультации, расшифровка анализов и второе мнение врача —
              без визита в клинику. Получайте ответы без задержен{" "}
            </p>
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
            <h3>Современные технологии</h3>
            <p>
              Все диагностические и лечебные процедуры проводятся на
              оборудовании нового поколения, то гарантирует высокую точность и
              результативность
            </p>
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
