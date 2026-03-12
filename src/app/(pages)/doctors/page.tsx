import Breadcrumbs from "@/app/components/Breadcrumbs/Breadcrumbs";
import fetchData from "@/app/utils/fetchData";
import { notFound } from "next/navigation";
import styles from "./style.module.scss";
import { DoctorCard } from "@/app/components";
export const metadata = {
  title: "Биосфера ДВ | Врачи центра ",
  description: "Врачи центра Биосфера ДВ",
};

type DoctorItem = {
  documentId?: string;
  [key: string]: unknown;
};

type PageResponse = {
  data?: DoctorItem[] | null;
};

export default async function DoctorsPage() {
  let page: PageResponse | null = null;

  try {
    page = await fetchData<PageResponse>(`/api/vrachis?populate=*`);
  } catch {
    return notFound();
  }
  if (!page?.data || (Array.isArray(page.data) && page.data.length === 0)) {
    return notFound();
  }

  const data = page?.data;

  return (
    <div className="container">
      <Breadcrumbs secondLabel="Врачи центра " />
      <h1 className={styles.promo_title}>
        <span className="text-gradient">Профессиональная </span>
        команда врачей
      </h1>
      <p className={styles.promo_description}>
        Квалифицированные специалисты с современным взглядом на диагностику и
        лечение.
      </p>

      <ul className={styles.list}>
        {data &&
          data.length > 0 &&
          data.map((item, index) => (
            <li key={item.documentId ?? index} className={styles.item1}>
              <DoctorCard data={item} />
            </li>
          ))}
      </ul>
    </div>
  );
}
