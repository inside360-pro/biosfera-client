import Breadcrumbs from "@/app/components/Breadcrumbs/Breadcrumbs";

import styles from "./style.module.scss";
import fetchData from "@/app/utils/fetchData";
import { notFound } from "next/navigation";
import ContentRenderer, {
  type ContentItem,
} from "@/app/components/ContentRenderer/ContentRenderer";
import PromoButton from "./button";

type Item = {
  id: number;
  title?: string;
  descriptions?: ContentItem[] | null;
};

type PageResponse = {
  data: {
    title?: string | null;
    content?: ContentItem[] | null;
    meta_title?: string | null;
    meta_descpiptions?: string | null;
    list?: Item[] | null;
  };
};

const apiUrl = "/api/stranicza-vakansii?populate=*";

export async function generateMetadata() {
  const page = await fetchData<PageResponse>(apiUrl);

  return {
    title: `${page?.data?.meta_title}`,
    description: page?.data?.meta_descpiptions ?? "",
    openGraph: {
      title: `${page?.data?.meta_title}`,
      description: page?.data?.meta_descpiptions ?? "",
    },
  };
}

export default async function Vacancies() {
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
    <div className="container">
      <Breadcrumbs secondLabel={page?.data?.title ?? "Вакансии"} />

      <h1 className={styles.title}>{page?.data?.title}</h1>

      <div className={styles.content_wrapper}>
        <ContentRenderer content={page?.data?.content ?? []} />
      </div>

      <ul className={styles.list}>
        {page?.data?.list?.map((item) => (
          <li key={item.id} className={styles.item}>
            <div className={styles.promo_item_content}>
              <h3 className={`${styles.promo_item_title}`}>{item.title}</h3>
              <ContentRenderer content={item?.descriptions ?? []} />
            </div>

            <PromoButton />
          </li>
        ))}
      </ul>
    </div>
  );
}
