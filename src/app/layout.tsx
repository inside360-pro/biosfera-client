import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
  title: "Биосфера ДВ",
  description: "Биосфера ДВ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={Involve.variable}>
        {children}
        <div
          id="medflexRoundWidgetData"
          data-src="https://booking.medflex.ru?user=be54557cf76e37ed7e2b8308eecb3e44&isRoundWidget=true"
        ></div>{" "}
        <script
          defer
          src="https://booking.medflex.ru/components/round/round_widget_button.js"
          charSet="utf-8"
        ></script>
      </body>
    </html>
  );
}
