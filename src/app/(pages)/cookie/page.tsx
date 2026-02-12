import fetchData from "@/app/utils/fetchData";
import ContentPage from "./ContentPage";
import styles from "./style.module.scss";
import type { PolicyPageData } from "./types";

export const metadata = {
  title: "Биосфера ДВ | Политика использования файлов cookie",
  description: "Политика использования файлов cookie для сайта Биосфера ДВ",
};

const apiUrl = `api/stranicza-cookie?populate=*`;

export default async function Policy() {
  let data: PolicyPageData | null = null;
  try {
    const response = await fetchData(apiUrl);
    data = response as PolicyPageData;
  } catch (error) {
    console.error("Ошибка при загрузке данных:", error);
  }
  return (
    <div className="container">
      <h1 className={styles.title}>Политика использования файлов cookie</h1>
      {data ? <ContentPage data={data} /> : null}
    </div>
  );
}
