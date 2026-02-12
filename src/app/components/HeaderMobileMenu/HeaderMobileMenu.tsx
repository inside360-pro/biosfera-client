"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./style.module.scss";

const menuLinks = [
  {
    title: "Услуги",
    url: "#",
    submenu: [
      { title: "Терапия", url: "#" },
      { title: "Неврология", url: "#" },
      { title: "Эндокринология", url: "#" },
      { title: "Диагностика", url: "#" },
    ],
  },
  { title: "Цены", url: "/price" },
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
  setPopupOpened: (opened: boolean) => void;
}) {
  const [submenuOpen, setSubmenuOpen] = useState(false);

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
        {menuLinks.map((item, idx) => (
          <li className={styles.nav_item} key={item.title}>
            <div className={styles.nav_item_inner}>
              {!item.submenu && <Link href={item.url}>{item.title}</Link>}
              {item.submenu && (
                <Link
                  href={item.url}
                  aria-expanded={submenuOpen}
                  aria-controls={`mobile-submenu-${idx}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setSubmenuOpen(!submenuOpen);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === " ") {
                      e.preventDefault();
                      setSubmenuOpen(!submenuOpen);
                    }
                  }}
                >
                  {item.title}
                </Link>
              )}
              {item.submenu && (
                <Image
                  src="/icons/dropdown-icon.svg"
                  className="dsv-image"
                  alt="arrow"
                  width={10}
                  height={3}
                />
              )}
            </div>
            {item.submenu && (
              <ul
                id={`mobile-submenu-${idx}`}
                className={`${styles.submenu_list} ${submenuOpen ? styles.active : ""}`}
              >
                <li className={styles.nav_item} key={item.title}>
                  <Link href={item.url}>{item.title}</Link>
                </li>
                {item.submenu.map((subitem) => (
                  <li className={styles.submenu_item} key={subitem.title}>
                    <Link href={subitem.url}>{subitem.title}</Link>
                  </li>
                ))}
              </ul>
            )}
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
        type="button"
        className={styles.primary_button}
        onClick={() => setPopupOpened(true)}
      >
        Записаться на прием
      </button>
    </div>
  );
}
