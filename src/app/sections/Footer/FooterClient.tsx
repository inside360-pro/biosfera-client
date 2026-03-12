"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./style.module.scss";
import { Cookies, Popup } from "@/app/components";

import { usePopupStore } from "@/app/store/popupStore";
import {
  createTelLink,
  normalizePhoneForTel,
} from "@/app/utils/normalizePhoneForTel";

export type FooterContacts = {
  address: string;
  phone: string;
  email: string;
};

export type FooterClientProps = {
  phone?: string;
  email?: string;
  address?: string;
  weekday_schedule?: string;
};

const DEFAULT_CONTACTS: FooterContacts = {
  address: "г. Владивосток, пр-т 100-летия Владивостока, 84а, помещение 3н.",
  phone: "+7 (924) 722-99-70",
  email: "biosfera_dv@mail.ru",
};

const DEFAULT_WEEKDAY_SCHEDULE = ["ПН-ПТ 10:00 - 18:00", "СБ 11:00 - 16:00"];

const FOOTER_NAV = [
  {
    title: "Услуги",
    links: [
      { label: "Терапия", href: "/services/therapy" },
      { label: "Неврология", href: "/services/nevrologiya" },
      { label: "Эндокринология", href: "/services/endokrinologiya" },
      {
        label: "Функциональная диагностика",
        href: "/services/therapy/funkcionalnaya-diagnostika",
      },
      {
        label: "Лабораторная диагностика",
        href: "/services/therapy/laboratornaya-diagnostika",
      },
      { label: "Телемедицина", href: "/services/therapy/telemedicina" },
    ],
  },
  {
    title: "Пациентам",
    links: [
      { label: "Правовая информация", href: "/patients/yuridicheskie-dannye" },
      { label: "Лицензии", href: "/patients/licenzii" },
      {
        label: "Подписание договора онлайн",
        href: "/patients/podpisanie-dogovora-onlayn",
      },
    ],
  },
  {
    title: "О центре",
    links: [
      { label: "Врачи", href: "/doctors" },
      { label: "Цены", href: "/price" },
      { label: "Акции", href: "/promo" },
    ],
  },
  {
    title: "Новости",
    links: [
      { label: "Контакты", href: "/contacts" },
      { label: "Отзывы", href: "/reviews" },
      { label: "Вакансии", href: "/vacancies" },
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

export default function FooterClient(props: FooterClientProps) {
  const { popupOpened, togglePopupState } = usePopupStore();

  const contacts: FooterContacts = {
    ...DEFAULT_CONTACTS,
    ...(props.address ? { address: props.address } : {}),
    ...(props.phone ? { phone: props.phone } : {}),
    ...(props.email ? { email: props.email } : {}),
  };

  const phoneHref = contacts.phone ? createTelLink(contacts.phone) : "";
  const phoneText = contacts.phone ? formatPhoneForDisplay(contacts.phone) : "";
  const emailHref = contacts.email ? `mailto:${contacts.email}` : "";
  const scheduleLines = scheduleToLines(props.weekday_schedule);

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
              <span>{contacts.address}</span>
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
                {contacts.phone ? (
                  <a href={phoneHref}>{phoneText}</a>
                ) : (
                  <span />
                )}
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
                {contacts.email ? (
                  <a href={emailHref}>{contacts.email}</a>
                ) : (
                  <span />
                )}
                {contacts.email ? (
                  <a href={emailHref} className={styles.footer__contact_action}>
                    Написать
                  </a>
                ) : null}
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
                {scheduleLines.map((line, idx) => (
                  <span key={`${idx}-${line}`}>{line}</span>
                ))}
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
