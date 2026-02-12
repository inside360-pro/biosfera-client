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
        <h1 className={styles.title}>Цены</h1>

        <ContentPage />
      </div>
    </main>
  );
}
