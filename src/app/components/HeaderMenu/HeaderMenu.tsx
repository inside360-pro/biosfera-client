"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./style.module.scss";
import fetchData from "@/app/utils/fetchData";
import { useEffect, useState } from "react";

type ServicesResponse = {
  data?: {
    list?: ServicesItem[];
  };
};

type ServicesItem = {
  title?: string;
  slug?: string;
  image?: { url: string } | null;
  order?: number;
};

const menuLinks = [
  {
    title: "Услуги",
    url: "/services",
    // submenu: [
    //   { title: "Терапия", url: "/services/therapy" },
    //   { title: "Неврология", url: "/services/nevrologiya" },
    //   { title: "Эндокринология", url: "/services/endokrinologiya" },
    //   {
    //     title: "Функциональная диагностика",
    //     url: "/services/therapy/funkcionalnaya-diagnostika",
    //   },
    //   {
    //     title: "Лабораторная диагностика",
    //     url: "/services/therapy/laboratornaya-diagnostika",
    //   },
    //   {
    //     title: "Телемедицина",
    //     url: "/services/therapy/telemedicina",
    //   },
    //   {
    //     title: "Ультразвуковая диагностика",
    //     url: "/services/therapy/ultrazvukovaya-diagnostika",
    //   },
    //   {
    //     title: "Блокады",
    //     url: "/services/therapy/blokady",
    //   },
    // ],
  },
  { title: "Цены", url: "/price" },
  { title: "Врачи", url: "/doctors" },
  { title: "Акции ", url: "/promo" },
  { title: "Пациентам", url: "/patients" },
  { title: "Новости", url: "/news" },
  { title: "О центре", url: "/about" },
  { title: "Контакты", url: "/contacts" },
];

const apiUrl = `api/stranicza-uslugi?populate[list][populate]=*`;

export default function HeaderMenu() {
  const [services, setServices] = useState<ServicesItem[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      const response = await fetchData<ServicesResponse>(apiUrl);
      setServices(response?.data?.list ?? []);
    };
    fetchServices();
  }, []);

  return (
    <nav className={styles.nav_wrapper}>
      <ul className={styles.nav_list}>
        {menuLinks.map((item) => (
          <li className={styles.nav_item} key={item.title}>
            <Link href={item.url}>{item.title}</Link>
            {item.url === "/services" && services.length > 0 && (
              <Image
                src="/icons/dropdown-icon.svg"
                className="dsv-image"
                alt="arrow"
                width={10}
                height={3}
              />
            )}
            {item.url === "/services" && services.length > 0 && (
              <ul className={styles.submenu_list}>
                {services
                  .slice()
                  .sort((a, b) => (a.order || 0) - (b.order || 0))
                  .map((subitem) => (
                    <li className={styles.submenu_item} key={subitem.slug}>
                      <Link href={`${subitem.slug}`}>{subitem.title}</Link>
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
