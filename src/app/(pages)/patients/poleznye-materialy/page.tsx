import { SideBarMenu } from "@/app/components";
import Breadcrumbs from "@/app/components/Breadcrumbs/Breadcrumbs";
import styles from "../style.module.scss";

export const metadata = {
  title: "Полезные материалы",
  description: "Полезные материалы для пациентов",
};

export default async function PoleznyeMaterialy() {
  return (
    <main className="container">
      <Breadcrumbs secondLabel={"Полезные материалы"} />

      <div className={styles.page_wrapper}>
        <SideBarMenu />
        <div className={styles.content} id="section">
          <h1>Полезные материалы</h1>
          <p>Здесь пока ничего нет, но скоро будет.</p>
        </div>
      </div>
    </main>
  );
}
