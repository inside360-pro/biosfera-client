"use client";
import Image from "next/image";
import Link from "next/link";
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

export default function HeaderMenu() {
  return (
    <nav className={styles.nav_wrapper}>
      <ul className={styles.nav_list}>
        {menuLinks.map((item) => (
          <li className={styles.nav_item} key={item.title}>
            <Link href={item.url}>{item.title}</Link>
            {item.submenu && (
              <Image
                src="/icons/dropdown-icon.svg"
                className="dsv-image"
                alt="arrow"
                width={10}
                height={3}
              />
            )}
            {item.submenu && (
              <ul className={styles.submenu_list}>
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
    </nav>
  );
}
