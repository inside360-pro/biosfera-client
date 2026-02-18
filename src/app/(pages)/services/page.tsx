import { Accordion, Breadcrumbs } from "@/app/components";
import { Services } from "@/app/sections";
import fetchData from "@/app/utils/fetchData";
import styles from "./style.module.scss";

export const metadata = {
  title: "Биосфера ДВ | Услуги",
  description: "Услуги для сайта Биосфера ДВ",
};

type FaqItem = {
  title: string;
  content: string;
};

type ServicesPageData = {
  data?: {
    faq?: {
      item?: FaqItem[];
    };
  };
};

const apiUrl = `api/stranicza-uslugi?populate[faq][populate]=*`;

export default async function ServicesPage() {
  let list: FaqItem[] = [];
  try {
    const response = (await fetchData(apiUrl)) as ServicesPageData;
    list = response?.data?.faq?.item ?? [];
  } catch (error) {
    console.error("Ошибка при загрузке данных:", error);
  }
  return (
    <div className="container">
      <Breadcrumbs secondLabel="Услуги" />
      <h1 className="visually-hidden">Услуги</h1>
      <Services className={"mt-0"} />
      <section className={styles.faq}>
        <header className={styles.faq__header}>
          <h2 className={styles.title}>
            Часто задаваемые <span className="text-gradient">вопросы</span>
          </h2>
          <p>
            Если вы не нашли нужную информацию — вы всегда можете задать вопрос
            администратору или врачу
          </p>
        </header>
        <Accordion list={list} />
      </section>
    </div>
  );
}
