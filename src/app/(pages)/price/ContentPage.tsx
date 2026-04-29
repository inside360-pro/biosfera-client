"use client";

import Script from "next/script";
import { PriceForm } from "@/app/components";
import styles from "./style.module.scss";
import CostItemMed from "@/app/components/CostItemMed/CostItemMed";

type MedflexService = {
  id: number | string;
  name: string;
  price?: number | string;
};

export default function ContentPage({
  services,
}: {
  services: MedflexService[];
}) {
  return (
    <>
      {/* <div
        id="medflexPricesWidgetData"
        data-src="https://booking.medflex.ru?user=be54557cf76e37ed7e2b8308eecb3e44"
        className="container"
      />
      <Script
        src="https://booking.medflex.ru/components/prices/prices_widget.js"
        strategy="afterInteractive"
        charSet="utf-8"
      /> */}

      <section className={`${styles.costs} ${styles.section}`}>
        <div className="container">
          <header className={styles.costs__header}>
            <h2 className={styles.costs__title}>
              <span className="text-gradient">Услуги медицинского центра </span>
              «Биосфера ДВ»
            </h2>
          </header>

          <ul className={styles.costs__list}>
            {services.map((item) => (
              <CostItemMed key={item.id} data={item} />
            ))}
          </ul>
        </div>
      </section>

      <section className={`${styles.price} ${styles.section}`}>
        <div className="container">
          <PriceForm />
        </div>
      </section>
    </>
  );
}
