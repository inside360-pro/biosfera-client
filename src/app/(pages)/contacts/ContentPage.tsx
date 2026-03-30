"use client";

import Image from "next/image";
import { usePopupStore } from "@/app/store/popupStore";
import styles from "./style.module.scss";
import {
  createTelLink,
  normalizePhoneForTel,
} from "@/app/utils/normalizePhoneForTel";

// Yandex Maps Constructor — um=constructor%3A{id}
const MAP_IFRAME_SRC =
  "https://yandex.ru/map-widget/v1/?um=constructor%3A965ea98ec7bd1fa8d2bcfd7a20a401ff991b535b100c6827c2363bf32b1cf478&lang=ru_RU";

const DEFAULT_ADDRESS =
  "г. Владивосток, пр-т 100-летия Владивостока, 84а, помещение 3н.";
const DEFAULT_PHONE = "+7 (924) 722-99-70";
const DEFAULT_EMAIL = "info.biosfera_dv@mail.ru";
const DEFAULT_WEEKDAY_SCHEDULE = ["ПН-ПТ 10:00 - 18:00", "СБ 11:00 - 16:00"];

export type ContactsContentProps = {
  phone?: string;
  email?: string;
  address?: string;
  weekday_schedule?: string;
};

function formatPhoneForDisplay(phone: string): string {
  const normalized = normalizePhoneForTel(phone);
  const match = normalized.match(/^\+7(\d{3})(\d{3})(\d{2})(\d{2})$/);
  if (match) {
    return `+7 (${match[1]}) ${match[2]}-${match[3]}-${match[4]}`;
  }

  return phone
    .replace(/\u00A0/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function scheduleToLines(value?: string): string[] {
  if (!value) return DEFAULT_WEEKDAY_SCHEDULE;
  const lines = value
    .replace(/\u00A0/g, " ")
    .split(/\r?\n|<br\s*\/?>/i)
    .map((s) => s.trim())
    .filter(Boolean);
  return lines.length ? lines : DEFAULT_WEEKDAY_SCHEDULE;
}

export default function ContentPage(props: ContactsContentProps) {
  const { togglePopupState } = usePopupStore();

  const address = props.address ?? DEFAULT_ADDRESS;
  const phone = props.phone ?? DEFAULT_PHONE;
  const email = props.email ?? DEFAULT_EMAIL;
  const scheduleLines = scheduleToLines(props.weekday_schedule);

  const phoneHref = phone ? createTelLink(phone) : "";
  const phoneText = phone ? formatPhoneForDisplay(phone) : "";
  const emailHref = email ? `mailto:${email}` : "";

  return (
    <section className={styles.map}>
      <div className={styles.map__outer_wrapper}>
        <div className={styles.map__wrapper}>
          <div className={styles.map__header}>
            <h2 className={styles.map__title}>Как проехать</h2>
            <div className={styles.map__widget_container}>
              <a
                href="https://prodoctorov.ru/vladivostok/lpu/112840-medicinskiy-centr-biosfera-dv/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://prodoctorov.ru/rating/112840/"
                  title="Рейтинг - Медицинский центр «Биосфера ДВ»"
                  alt="Рейтинг - Медицинский центр «Биосфера ДВ»"
                />
              </a>
            </div>
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
                  <span>{address}</span>
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
                    {phone ? <a href={phoneHref}>{phoneText}</a> : <span />}
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
                    {email ? <a href={emailHref}>{email}</a> : <span />}
                    {email ? (
                      <a
                        href={emailHref}
                        className={`${styles.map__contact_link} text-gradient`}
                      >
                        Написать
                      </a>
                    ) : null}
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
                    {scheduleLines.map((line, idx) => (
                      <span key={`${idx}-${line}`}>{line}</span>
                    ))}
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
