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
        <div
          id="medflexPricesWidgetData"
          data-src="https://booking.medflex.ru?user=be54557cf76e37ed7e2b8308eecb3e44"
        ></div>{" "}
        <script
          defer
          src="https://booking.medflex.ru/components/prices/prices_widget.js"
          charSet="utf-8"
        ></script>
      </div>
    </main>
  );
}
