import Breadcrumbs from "@/app/components/Breadcrumbs/Breadcrumbs";
import ContentPage from "./ContentPage";
import styles from "./style.module.scss";

export const metadata = {
  title: "Биосфера ДВ | Цены",
  description: "Цены для сайта Биосфера ДВ",
};

export default async function Price() {
  return (
    <main className={styles.main}>
      <div className="container">
        <Breadcrumbs secondLabel="Цены" />
        <h1 className={styles.title}>
          <span className="text-gradient">Цены</span> и услуги
        </h1>
        <ContentPage />
      </div>
    </main>
  );
}
