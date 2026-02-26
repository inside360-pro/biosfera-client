import localFont from "next/font/local";
import "./globals.css";
import { Footer } from "./sections";
import { Header, Metrika } from "./components";
import type { Metadata } from "next";
import { Suspense } from "react";
import Script from "next/script";

// import "./nebo.css"; тут пока не используется

const Involve = localFont({
  src: [
    { path: "./fonts/Involve-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/Involve-Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/Involve-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "./fonts/Involve-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-family",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://biosphera.ru"),
  title: "Записаться на прием в «Биосфера ДВ» | Владивосток",
  description:
    "Онлайн-запись к терапевту, неврологу, эндокринологу в центре «Биосфера ДВ». Адрес: пр-т 100-летия Владивостока, 84а. Звоните: +7 (924) 338-81-89",
  keywords:
    "запись на прием Владивосток, терапевт Владивосток, невролог Владивосток, эндокринолог Владивосток, медицинский центр Биосфера ДВ, диагностика Владивосток, записаться к врачу онлайн, Приморский край",
  openGraph: {
    title: "Биосфера ДВ",
    description: "Биосфера ДВ - забота о вашем здоровье на всех этапах",
    images: ["/logo.svg"],
    url: "/",
    siteName: "Биосфера ДВ",
    locale: "ru_RU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={Involve.variable}>
        <Suspense>
          <Metrika />
        </Suspense>
        <Header />
        {children}
        <Footer />
        <div
          id="medflexRoundWidgetData"
          data-src="https://booking.medflex.ru?user=be54557cf76e37ed7e2b8308eecb3e44&isRoundWidget=true"
        />
        <Script
          src="https://booking.medflex.ru/components/round/round_widget_button.js"
          strategy="afterInteractive"
          charSet="utf-8"
        />
      </body>
    </html>
  );
}
