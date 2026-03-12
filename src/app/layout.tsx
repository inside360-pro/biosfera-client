import localFont from "next/font/local";
import "./globals.css";
import { Footer } from "./sections";
import { Header, Metrika } from "./components";
import type { Metadata } from "next";
import { Suspense } from "react";
import Script from "next/script";
import fetchData from "@/app/utils/fetchData";

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

const fallbackMetadata: Metadata = {
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

const GLOBAL_API_URL = "/api/global";

type GlobalSeo = {
  title?: string;
  description?: string;
  keywords?: string | string[];
};

type GlobalApiResponse = {
  data?: { attributes?: GlobalSeo } | GlobalSeo;
};

function pickNonEmptyString(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const v = value.trim();
  return v ? v : undefined;
}

function normalizeKeywords(value: unknown): Metadata["keywords"] | undefined {
  if (typeof value === "string") {
    return pickNonEmptyString(value);
  }
  if (Array.isArray(value)) {
    const list = value
      .filter((x): x is string => typeof x === "string")
      .map((s) => s.trim())
      .filter(Boolean);
    return list.length ? list : undefined;
  }
  return undefined;
}

export async function generateMetadata(): Promise<Metadata> {
  const fallback = fallbackMetadata;

  try {
    const response = await fetchData<GlobalApiResponse>(GLOBAL_API_URL);
    const d = response?.data;
    const seo =
      d && typeof d === "object" && "attributes" in d
        ? (d as { attributes?: GlobalSeo }).attributes
        : (d as GlobalSeo | undefined);

    const title = pickNonEmptyString(seo?.title) ?? (fallback.title as string);
    const description =
      pickNonEmptyString(seo?.description) ?? (fallback.description ?? "");
    const keywords = normalizeKeywords(seo?.keywords) ?? fallback.keywords;

    return {
      ...fallback,
      title,
      description,
      keywords,
      openGraph: {
        ...fallback.openGraph,
        title,
        description,
      },
    };
  } catch (error) {
    console.error("Ошибка при загрузке /api/global для metadata:", error);
    return fallback;
  }
}

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
