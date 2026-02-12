import fetchData from "@/app/utils/fetchData";
import ContentPage from "./ContentPage";
import styles from "./style.module.scss";
import type { PolicyPageData } from "./types";

export const metadata = {
  title: "Биосфера ДВ | Политика конфиденциальности",
  description: "Политика конфиденциальности для сайта Биосфера ДВ",
};

const apiUrl = `api/stranicza-politika-konfidenczialnosti?populate=*`;

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
      <h1 className={styles.title}>Политика конфиденциальности</h1>
      {data ? <ContentPage data={data} /> : null}
    </div>
  );
}
