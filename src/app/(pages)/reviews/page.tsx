import Breadcrumbs from "@/app/components/Breadcrumbs/Breadcrumbs";
import ContentPage from "./ContentPage";
import styles from "./style.module.scss";

export const metadata = {
  title: "Биосфера ДВ | Отзывы",
  description: "Отзывы сайта Биосфера ДВ",
};

export default async function Reviews() {
  return (
    <main className={styles.main}>
      <div className="container">
        <Breadcrumbs secondLabel="Отзывы" />
      </div>
      <ContentPage />
    </main>
  );
}
