"use client";

import Script from "next/script";

export default function ContentPage() {
  return (
    <>
      <div
        id="medflexPricesWidgetData"
        data-src="https://booking.medflex.ru?user=be54557cf76e37ed7e2b8308eecb3e44"
      />
      <Script
        src="https://booking.medflex.ru/components/prices/prices_widget.js"
        strategy="afterInteractive"
        charSet="utf-8"
      />
    </>
  );
}
