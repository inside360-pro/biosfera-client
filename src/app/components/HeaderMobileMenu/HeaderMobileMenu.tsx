"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./style.module.scss";

const menuLinks = [
  {
    title: "Услуги",
    url: "#",
    submenu: [
      { title: "Услуга 1", url: "#" },
      { title: "Услуга 2", url: "#" },
      { title: "Услуга 3", url: "#" },
    ],
  },
  { title: "Цены", url: "#" },
  { title: "Врачи", url: "#" },
  { title: "Акции ", url: "#" },
  { title: "Новости", url: "#" },
  { title: "О центре", url: "#" },
  { title: "Контакты", url: "#" },
];

export default function HeaderMobileMenu({
  active,
  setActive,
  setPopupOpened,
}: {
  active: boolean;
  setActive: (active: boolean) => void;
}) {
  return (
    <div
      className={`${styles.mobile_menu_wrapper} ${active ? styles.active : ""}`}
    >
      <header>
        <button
          className={styles.close_button}
          title="Закрыть"
          type="button"
          aria-label="Закрыть"
          onClick={() => setActive(false)}
        >
          <Image
            src="/icons/burger-close-icon.svg"
            alt="close"
            width={31}
            height={31}
          />
        </button>

        <Link href="/" className={styles.logo_link}>
          <Image
            src="/logo.svg"
            className="dsv-image"
            alt="logo"
            width={310}
            height={66}
          />
        </Link>
      </header>

      <ul className={styles.nav_list}>
        {menuLinks.map((item) => (
          <li className={styles.nav_item} key={item.title}>
            <Link href={item.url}>{item.title}</Link>
          </li>
        ))}
      </ul>
      <div className={styles.address_wrapper}>
        <Image
          src="/icons/pin-icon.svg"
          className="dsv-image"
          alt="logo"
          width={22}
          height={22}
        />
        <p>Пр-т 100-летия Владивостока, 84а</p>
      </div>

      <a href="tel:+79243388189" className={styles.phone_link}>
        <Image
          src="/icons/phone.svg"
          className="dsv-image"
          alt="logo"
          width={22}
          height={22}
        />
        <span>+7 (924) 338-81-89</span>
      </a>

      <button
        className={styles.primary_button}
        onClick={() => setPopupOpened(true)}
      >
        Записаться на прием
      </button>
    </div>
  );
}
