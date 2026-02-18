"use client";

import Image from "next/image";
import { usePopupStore } from "@/app/store/popupStore";
import styles from "./style.module.scss";

// Yandex Maps Constructor — um=constructor%3A{id}
const MAP_IFRAME_SRC =
  "https://yandex.ru/map-widget/v1/?um=constructor%3A965ea98ec7bd1fa8d2bcfd7a20a401ff991b535b100c6827c2363bf32b1cf478&lang=ru_RU";

export default function ContentPage() {
  const { togglePopupState } = usePopupStore();
  return (
    <section className={styles.map}>
      <div className={styles.map__outer_wrapper}>
        <div className={styles.map__wrapper}>
          <div className={styles.map__header}>
            <h2 className={styles.map__title}>Как проехать</h2>
            <p className={styles.map__subtitle}>
              Мы находимся в удобном месте, куда вы можете приехать на
              общественном транспорте
            </p>
          </div>

          <div className={styles.map__content}>
            <div className={styles.map__main}>
              <ul className={styles.map__contacts}>
                <li className={styles.map__contact}>
                  <Image
                    src="/icons/geo_b.svg"
                    alt=""
                    width={24}
                    height={24}
                    className={styles.map__contact_icon}
                  />
                  <span>
                    г. Владивосток, пр-т 100-летия Владивостока, 84а, помещение
                    3н.
                  </span>
                </li>
                <li className={styles.map__contact}>
                  <Image
                    src="/icons/phone.svg"
                    alt=""
                    width={24}
                    height={24}
                    className={styles.map__contact_icon}
                  />
                  <div>
                    <a href="tel:+79247229970">+7 (924)722 99 70</a>
                    <button
                      type="button"
                      className={`${styles.map__contact_link} text-gradient`}
                      onClick={() => togglePopupState()}
                    >
                      Заказать звонок
                    </button>
                  </div>
                </li>
                <li className={styles.map__contact}>
                  <Image
                    src="/icons/envelope.svg"
                    alt=""
                    width={24}
                    height={24}
                    className={styles.map__contact_icon}
                  />
                  <div>
                    <a href="mailto:biosfera_dv@mail.ru">biosfera_dv@mail.ru</a>
                    <a
                      href="mailto:biosfera_dv@mail.ru"
                      className={`${styles.map__contact_link} text-gradient`}
                    >
                      Написать
                    </a>
                  </div>
                </li>
                <li className={styles.map__contact}>
                  <Image
                    src="/icons/clock.svg"
                    alt=""
                    width={24}
                    height={24}
                    className={styles.map__contact_icon}
                  />
                  <div>
                    <span>ПН-ПТ 10:00 - 18:00</span>
                    <span>СБ 11:00 - 16:00</span>
                  </div>
                </li>
              </ul>

              <div className={styles.map__iframe_wrapper}>
                <iframe
                  src={MAP_IFRAME_SRC}
                  title="Карта Биосфера ДВ"
                  className={styles.map__iframe}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
