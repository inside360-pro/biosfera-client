"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./style.module.scss";
import { Cookies, Popup } from "@/app/components";

import { usePopupStore } from "@/app/store/popupStore";

const FOOTER_NAV = [
  {
    title: "Услуги",
    links: [
      { label: "Терапия", href: "#" },
      { label: "Неврология", href: "#" },
      { label: "Эндокринология", href: "#" },
      { label: "Диагностика", href: "#" },
    ],
  },
  {
    title: "Пациентам",
    links: [
      { label: "Правовая информация", href: "#" },
      { label: "Лицензии", href: "#" },
      { label: "Подписание договора онлайн", href: "#" },
    ],
  },
  {
    title: "О центре",
    links: [
      { label: "Врачи", href: "#" },
      { label: "Цены", href: "#" },
      { label: "Акции", href: "#" },
    ],
  },
  {
    title: "Новости",
    links: [
      { label: "Контакты", href: "#" },
      { label: "Отзывы", href: "#" },
      { label: "Вакансии", href: "#" },
    ],
  },
];

const LEGAL_LINKS = [
  { label: "Политика конфиденциальности", href: "/policy" },
  { label: "Пользовательское соглашение", href: "/terms" },
  { label: "Публичная оферта", href: "/offer" },
];

const DISCLAIMER =
  "Информация, представленная на данной странице сайта, носит исключительно информационный характер и предназначена только для образовательных целей. Посетители данного сайта не должны воспринимать её как медицинские рекомендации. Определение диагноза и выбор метода лечения должны быть осуществлены вашим лечащим врачом. «Биосфера ДВ» не несёт ответственности за возможные негативные последствия, возникшие в результате использования информации, представленной на данном сайте.";

export default function Footer() {
  const { popupOpened, togglePopupState } = usePopupStore();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footer__gradient}>
          <div className={styles.footer__top}>
            <div className={styles.footer__brand}>
              <Link href="/" className={styles.footer__logo}>
                <Image
                  src="/logo.svg"
                  alt="Биосфера ДВ"
                  width={200}
                  height={44}
                  className={styles.footer__logo_img}
                />
              </Link>
              <div className={styles.footer__license}>
                <span className={styles.footer__license_label}>Лицензия</span>
                <a href="https://" className={styles.footer__license_link}>
                  №Л041-01023-25/04107306
                </a>
                <span className={styles.footer__license_date}>
                  от 29.12.2025
                </span>
              </div>
            </div>

            <nav className={styles.footer__nav}>
              {FOOTER_NAV.map((column) => (
                <div key={column.title} className={styles.footer__nav_col}>
                  <h3 className={styles.footer__nav_title}>{column.title}</h3>

                  <ul className={styles.footer__nav_list}>
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className={styles.footer__nav_link}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>

          <div className={styles.footer__contacts}>
            <a
              href="https://cr.minzdrav.gov.ru"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footer__cr_link}
            >
              Клинические рекомендации https://cr.minzdrav.gov.ru
            </a>
            <div className={styles.footer__contact}>
              <Image
                src="/icons/pin-icon.svg"
                alt=""
                width={20}
                height={20}
                className={styles.footer__contact_icon}
              />
              <span>
                г. Владивосток, пр-т 100-летия Владивостока, 84а, помещение 3н.
              </span>
            </div>
            <div className={styles.footer__contact}>
              <Image
                src="/icons/phone.svg"
                alt=""
                width={20}
                height={20}
                className={styles.footer__contact_icon}
              />
              <div>
                <a href="tel:+79243388189">+7 (924) 338-81-89</a>
                <button
                  type="button"
                  className={styles.footer__contact_action}
                  onClick={togglePopupState}
                >
                  Заказать звонок
                </button>
              </div>
            </div>
            <div className={styles.footer__contact}>
              <Image
                src="/icons/envelope.svg"
                alt=""
                width={20}
                height={20}
                className={styles.footer__contact_icon}
              />
              <div>
                <a href="mailto:biosfera_dv@mail.ru">biosfera_dv@mail.ru</a>
                <a
                  href="mailto:biosfera_dv@mail.ru"
                  className={styles.footer__contact_action}
                >
                  Написать
                </a>
              </div>
            </div>
            <div className={styles.footer__contact}>
              <Image
                src="/icons/clock.svg"
                alt=""
                width={20}
                height={20}
                className={styles.footer__contact_icon}
              />
              <div>
                <span>ПН-ПТ 10:00 - 18:00</span>
                <span>СБ 11:00 - 16:00</span>
              </div>
            </div>
          </div>

          <div className={styles.footer__bottom_inner}>
            <div className={styles.footer__copyright}>
              © 2026. ООО «Биосфера ДВ». <br /> Все права защищены
            </div>

            <div className={styles.footer__emblems}>
              <Image src="/images/image 2.svg" alt="" width={60} height={60} />
              <Image src="/images/image 3.svg" alt="" width={60} height={60} />
              <Image src="/images/image 4.svg" alt="" width={60} height={60} />
            </div>

            <a
              href="https://cr.minzdrav.gov.ru"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footer__cr_link_mobile}
            >
              Клинические рекомендации https://cr.minzdrav.gov.ru
            </a>
            <div className={styles.footer__legal}>
              {LEGAL_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={styles.footer__legal_link}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="https://inside360.ru"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footer__dev}
              >
                Разработка и продвижение сайтов INSIDE360
              </Link>
            </div>
          </div>
          <div className={styles.footer__disclaimer_inner}>
            <p className={styles.footer__disclaimer_title}>
              Имеются противопоказания. Необходима консультация специалиста.
            </p>
            <p className={styles.footer__disclaimer_text}>{DISCLAIMER}</p>
          </div>
        </div>
      </div>

      <Popup active={popupOpened} setActive={togglePopupState} />
      <Cookies />
    </footer>
  );
}
