"use client";

import Script from "next/script";
import { PriceForm } from "@/app/components";
import styles from "./style.module.scss";

export default function ContentPage() {
  return (
    <>
      <div
        id="medflexPricesWidgetData"
        data-src="https://booking.medflex.ru?user=be54557cf76e37ed7e2b8308eecb3e44"
        className="container"
      />
      <Script
        src="https://booking.medflex.ru/components/prices/prices_widget.js"
        strategy="afterInteractive"
        charSet="utf-8"
      />

      <section className={`${styles.price} ${styles.section}`}>
        <div className="container">
          <PriceForm />
        </div>
      </section>
    </>
  );
}
