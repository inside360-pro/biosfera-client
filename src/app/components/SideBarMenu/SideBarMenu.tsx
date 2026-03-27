"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./style.module.scss";

const PENDING_SCROLL_TO_ID_KEY = "SideBarMenu:pendingScrollToId";

type MenuItem = {
  label: string;
  href: string;
  scrollToId?: string;
};

const items: MenuItem[] = [
  {
    label: "Программа лояльности",
    href: "/patients/programma-loyalnosti",
    scrollToId: "section",
  },
  {
    label: "Документы на налоговый вычет",
    href: "/patients/dokumenty-na-nalogovyy-vychet",
    scrollToId: "section",
  },
  {
    label: "Обслуживание по ДМС",
    href: "/patients/obsluzhivanie-po-dms",
    scrollToId: "section",
  },
  {
    label: "Полезные материалы",
    href: "/patients/poleznye-materialy",
    scrollToId: "section",
  },
  {
    label: "Мобильное приложение (МедТочка)",
    href: "/patients/otzyvy",
    scrollToId: "section",
  },
  {
    label: "Лицензии",
    href: "/patients/licenzii",
    scrollToId: "section",
  },
  {
    label: "Контролирующие органы",
    href: "/patients/kontroliruyushchie-organi",
    scrollToId: "section",
  },
  {
    label: "Подписание договора онлайн",
    href: "/patients/podpisanie-dogovora-onlayn",
    scrollToId: "section",
  },
  {
    label: "Карта парковок",
    href: "/patients/karta-parkovok",
    scrollToId: "section",
  },
];

const scrollToElement = (id: string, onSuccess?: () => void) => {
  let attempts = 0;

  const run = () => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      onSuccess?.();
      return;
    }

    attempts += 1;
    if (attempts < 25) setTimeout(run, 50);
  };

  run();
};

export default function SideBarMenu() {
  const pathname = usePathname();
  const isMobileRef = useRef(false);
  // Определяем мобильное устройство при монтировании и при ресайзе
  useEffect(() => {
    const checkMobile = () => {
      isMobileRef.current = window.innerWidth < 767;
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobileRef.current) return;
    if (!pathname) return;

    const pendingScrollToId = sessionStorage.getItem(PENDING_SCROLL_TO_ID_KEY);
    if (!pendingScrollToId) return;

    sessionStorage.removeItem(PENDING_SCROLL_TO_ID_KEY);
    scrollToElement(pendingScrollToId);
  }, [pathname]);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: MenuItem,
  ) => {
    if (!isMobileRef.current) return;
    if (!item.scrollToId) return;

    if (pathname === item.href) {
      e.preventDefault(); // остаёмся на странице, скроллим к контенту
      scrollToElement(item.scrollToId);
      return;
    }

    sessionStorage.setItem(PENDING_SCROLL_TO_ID_KEY, item.scrollToId);
  };

  return (
    <div className={styles.side_bar_menu}>
      <ul className={styles.menu__list}>
        {items.map((item) => (
          <li className={styles.menu__item} key={item.label}>
            <Link
              href={item.href}
              className={pathname === item.href ? "text-gradient" : ""}
              onClick={(e) => handleLinkClick(e, item)}
            >
              <span>{item.label}</span>
              {pathname === item.href && (
                <svg
                  width="4"
                  height="9"
                  viewBox="0 0 4 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Arrow</title>
                  <path
                    d="M0.417997 8.2168L3.15168 4.43854L0.417969 0.274551"
                    stroke="url(#paint0_linear_352_11869)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_352_11869"
                      x1="1.78482"
                      y1="8.2168"
                      x2="1.78482"
                      y2="0.274551"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#3170B4" />
                      <stop offset="1" stopColor="#5CCCC2" />
                    </linearGradient>
                  </defs>
                </svg>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
