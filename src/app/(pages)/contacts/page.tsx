import Breadcrumbs from "@/app/components/Breadcrumbs/Breadcrumbs";
import ContentPage from "./ContentPage";
import styles from "./style.module.scss";

export const metadata = {
  title: "Биосфера ДВ | Контакты",
  description: "Контакты для сайта Биосфера ДВ",
};

export default async function Contacts() {
  return (
    <div className="container">
      <Breadcrumbs secondLabel="Контакты" />
      <ContentPage />
    </div>
  );
}
