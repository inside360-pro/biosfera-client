"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import styles from "./style.module.scss";
import {
  VdsButton,
  VdsPanel,
  Search,
  Popup,
  HeaderMenu,
  HeaderMobileMenu,
} from "@/app/components";

export default function Header() {
  const [panel, setPanel] = useState(false);
  const [panelBtn, setPanelBtn] = useState(true);
  const [searchOpened, setSearchOpened] = useState(false);
  const [popupOpened, setPopupOpened] = useState(false);
  const [mobileMenuOpened, setMobileMenuOpened] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // закрываем поиск при клике вне кнопки и вне области поиска
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!searchOpened) return;

      const targetNode = event.target as Node | null;
      if (!targetNode) return;

      const isInsideButton = !!buttonRef.current?.contains(targetNode);
      const isInsideSearch = !!searchContainerRef.current?.contains(targetNode);

      if (!isInsideButton && !isInsideSearch) {
        setSearchOpened(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchOpened]);

  return (
    <header className="relative">
      <div className="container">
        {panel && <VdsPanel setPanel={setPanel} setPanelBtn={setPanelBtn} />}

        <div className={styles.header__inner}>
          <button
            className={styles.burger_button}
            title="Меню"
            type="button"
            aria-label="Меню"
            onClick={() => setMobileMenuOpened(true)}
          >
            <Image
              src="/icons/burger-icon.svg"
              className="dsv-image"
              alt="logo"
              width={25}
              height={15}
            />
          </button>

          <a href="/" className={styles.logo_link}>
            <Image
              src="/logo.svg"
              className="dsv-image"
              alt="logo"
              width={310}
              height={66}
            />
          </a>

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

          <div className={styles.header_social}>
            <button className={styles.item__button} title="Личный кабинет">
              <Image
                src="/icons/account-icon.svg"
                className="dsv-image"
                alt="logo"
                width={22}
                height={22}
              />
            </button>

            {panelBtn && (
              <VdsButton setPanel={setPanel} setPanelBtn={setPanelBtn} />
            )}

            <button
              className={styles.item__button}
              ref={buttonRef}
              onClick={() => setSearchOpened(!searchOpened)}
              title="Поиск"
            >
              <Image
                src="/icons/search-icon.svg"
                className="dsv-image"
                alt="logo"
                width={22}
                height={22}
              />
            </button>
          </div>
        </div>

        <HeaderMenu />
        <HeaderMobileMenu
          active={mobileMenuOpened}
          setActive={setMobileMenuOpened}
          setPopupOpened={setPopupOpened}
        />

        <div ref={searchContainerRef}>{searchOpened && <Search />}</div>
      </div>
      <Popup active={popupOpened} setActive={setPopupOpened} />
    </header>
  );
}
