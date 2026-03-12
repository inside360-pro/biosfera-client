import { SideBarMenu } from "@/app/components";
import Breadcrumbs from "@/app/components/Breadcrumbs/Breadcrumbs";
import styles from "../style.module.scss";

export const metadata = {
  title: "Программа лояльности",
  description: "Программа лояльности для пациентов",
};

export default async function Patients() {
  return (
    <main className="container">
      <Breadcrumbs secondLabel={"Программа лояльности"} />

      <div className={styles.page_wrapper}>
        <SideBarMenu />
        <div className={styles.content} id="section">
          <h1>Программа лояльности</h1>
          <p>Здесь пока ничего нет, но скоро будет.</p>
        </div>
      </div>
    </main>
  );
}
