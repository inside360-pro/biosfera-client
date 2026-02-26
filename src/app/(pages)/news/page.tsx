import fetchData from "@/app/utils/fetchData";
import ContentPage from "./ContentPage";
import styles from "./style.module.scss";
import type { NewsItemType } from "@/app/types";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/app/components/Breadcrumbs/Breadcrumbs";

type PageResponse = {
  data?: Array<Record<string, unknown>> | null;
};

export const metadata = {
  title: "Биосфера ДВ | Новости",
  description: "Новости для сайта Биосфера ДВ",
};

const apiUrl = `/api/novostis?populate=*`;

export default async function News() {
  let page: PageResponse | null = null;
  try {
    const response = await fetchData(apiUrl);
    page = response as PageResponse;
  } catch (error) {
    console.error("Ошибка при загрузке данных:", error);
  }

  if (!page?.data) {
    return notFound();
  }

  return (
    <div className="container">
      <Breadcrumbs secondLink="/news" secondLabel="Новости" />
      <h1 className={styles.title}>Новости</h1>
      {page ? (
        <ContentPage data={page.data as unknown as NewsItemType[]} />
      ) : null}
    </div>
  );
}
