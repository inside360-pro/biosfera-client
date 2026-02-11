"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./style.module.scss";
import { Popup } from "@/app/components";

const MAP_TABS = [
  { id: "scheme", label: "Схема города" },
  { id: "map", label: "Карта" },
] as const;

const TRANSPORT_STOPS = [
  { name: "Парк Победы", walkTime: "3 мин. пешком" },
  { name: "Русская", walkTime: "5 мин. пешком" },
];

// Yandex Maps Constructor — um=constructor%3A{id}
const MAP_IFRAME_SRC =
  "https://yandex.ru/map-widget/v1/?um=constructor%3A965ea98ec7bd1fa8d2bcfd7a20a401ff991b535b100c6827c2363bf32b1cf478&lang=ru_RU";

const YANDEX_MAPS_LINK =
  "https://yandex.ru/maps/?pt=131.908196,43.119809&z=16&l=map";

export default function Map() {
  const [activeTab, setActiveTab] = useState<"scheme" | "map">("map");
  const [popupOpened, setPopupOpened] = useState(false);

  return (
    <section className={styles.map}>
      <div className="container">
        <div className={styles.map__outer_wrapper}>
          <div className={styles.map__wrapper}>
            <div className={styles.map__header}>
              <h2 className={styles.map__title}>Как проехать</h2>
              <p className={styles.map__subtitle}>
                Мы находимся в удобном месте, куда вы можете приехать на
                общественном транспорте
              </p>
            </div>
            <div className={styles.map__tabs_row}>
              <div className={styles.map__tabs}>
                {MAP_TABS.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    className={`${styles.map__tab} ${
                      activeTab === tab.id ? styles.map__tab_active : ""
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className={styles.map__stops_row}>
                {TRANSPORT_STOPS.map((stop) => (
                  <div key={stop.name} className={styles.map__stop}>
                    <Image
                      src="/icons/geo.svg"
                      alt=""
                      width={60}
                      height={60}
                      className={styles.map__stop_icon}
                    />
                    <div>
                      <p className={styles.map__stop_name}>
                        Остановка «{stop.name}»
                      </p>
                      <p className={styles.map__stop_walk}>{stop.walkTime}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.map__content}>
              <div className={styles.map__main}>
                <div className={styles.map__iframe_wrapper}>
                  {activeTab === "map" ? (
                    <iframe
                      src={MAP_IFRAME_SRC}
                      title="Карта Биосфера ДВ"
                      className={styles.map__iframe}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  ) : (
                    <div className={styles.map__placeholder}>
                      <p>Схема города — загрузите iframe или изображение</p>
                    </div>
                  )}
                </div>

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
                      г. Владивосток, пр-т 100-летия Владивостока, 84а,
                      помещение 3н.
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
                      <a href="tel:+79243388189">+7 (924) 338-81-89</a>
                      <button
                        type="button"
                        className={styles.map__contact_link}
                        onClick={() => setPopupOpened(true)}
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
                      <a href="mailto:biosfera_dv@mail.ru">
                        biosfera_dv@mail.ru
                      </a>
                      <a
                        href="mailto:biosfera_dv@mail.ru"
                        className={styles.map__contact_link}
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
              </div>
            </div>
          </div>
        </div>
      </div>

      <Popup active={popupOpened} setActive={setPopupOpened} />
    </section>
  );
}
