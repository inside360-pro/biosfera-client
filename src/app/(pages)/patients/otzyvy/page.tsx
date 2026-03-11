import Breadcrumbs from "@/app/components/Breadcrumbs/Breadcrumbs";
import styles from "../style.module.scss";
import fetchData from "@/app/utils/fetchData";
import { notFound } from "next/navigation";
import { SideBarMenu } from "@/app/components";
import { ReviewsForm } from "@/app/components";

type PageResponse = {
  data: {
    meta_title: string;
    meta_descpiption: string;
    title: string;
    [key: string]: any; // any type for any key
  };
};

const apiUrl = `/api/stranicza-paczientam?populate=*`;

export async function generateMetadata() {
  const page = await fetchData<PageResponse>(apiUrl);

  return {
    title: `${page?.data?.meta_title}`,
    description: page?.data?.meta_descpiption ?? "",
    openGraph: {
      title: `${page?.data?.meta_title}`,
      description: page?.data?.meta_descpiption ?? "",
    },
  };
}

export default async function Patients() {
  let page: PageResponse | null = null;

  try {
    page = await fetchData<PageResponse>(apiUrl);
  } catch (error) {
    console.error("Ошибка при загрузке данных:", error);
  }

  if (!page?.data) {
    return notFound();
  }
  return (
    <main className="container">
      <Breadcrumbs secondLabel={page?.data?.title ?? "Пациентам"} />

      <div className={styles.page_wrapper}>
        <SideBarMenu />
        <div className={styles.content} id="section">
          {/* <ReviewsForm /> */}

          <h1>Личный кабинет пациента</h1>
          <p>с защищённой электронной медкартой, которую легко показать любому врачу</p>

          <a className={styles.mob_link} target="_blank" href="https://medtochka.ru/">Скачать мобильное приложение <span className="text-gradient">МедТочка</span></a>
        </div>
      </div>
    </main>
  );
}
