import fetchData from "@/app/utils/fetchData";
import ContentPage from "./ContentPage";
import styles from "./style.module.scss";
import type { PolicyPageData } from "./types";

export const metadata = {
  title: "Биосфера ДВ | Пользовательское соглашение",
  description: "Пользовательское соглашение для сайта Биосфера ДВ",
};

const apiUrl = `/api/stranicza-polzovatelskoe-soglashenie?populate=*`;

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
      <h1 className={styles.title}>Пользовательское соглашение</h1>
      {data ? <ContentPage data={data} /> : null}
    </div>
  );
}
