import Breadcrumbs from "@/app/components/Breadcrumbs/Breadcrumbs";
import styles from "../style.module.scss";
import fetchData from "@/app/utils/fetchData";
import { notFound } from "next/navigation";
import { ContentRenderer, SideBarMenu } from "@/app/components";
import Image from "next/image";

type PageResponse = {
  data: {
    meta_title: string;
    meta_descpiption: string;
    title: string;
    [key: string]: any; // any type for any key
  };
};

const apiUrl = `/api/stranicza-paczientam-obsluzhivanie-po-dms?populate=*`;

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

  const data = page?.data;

  return (
    <main className="container">
      <Breadcrumbs secondLabel={page?.data?.title ?? "Пациентам"} />

      <div className={styles.page_wrapper}>
        <SideBarMenu />
        <div className={styles.content} id="section">
          <h1 className={styles.content__title}>
            {data?.title ?? "Обслуживание по ДМС"}
          </h1>

          <div className={styles.content_image_wrapper}>
            {data?.image?.url && (
              <Image
                src={`${process.env.NEXT_PUBLIC_API_SERVER}${data?.image?.url}`}
                className="dsv-image"
                alt={data?.title ?? "Обслуживание по ДМС"}
                width={935}
                height={347}
              />
            )}
          </div>
          <ContentRenderer content={data?.content} />
        </div>
      </div>
    </main>
  );
}
