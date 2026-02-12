import fetchData from "@/app/utils/fetchData";
import ContentPage from "./ContentPage";
import styles from "./style.module.scss";
import type { PolicyPageData } from "./types";

export const metadata = {
  title: "Биосфера ДВ | Публичная оферта",
  description: "Публичная оферта для сайта Биосфера ДВ",
};

const apiUrl = `api/stranicza-publichnaya-oferta?populate=*`;

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
      <h1 className={styles.title}>Публичная оферта</h1>
      {data ? <ContentPage data={data} /> : null}
    </div>
  );
}
