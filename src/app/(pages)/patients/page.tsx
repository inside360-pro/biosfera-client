import Breadcrumbs from "@/app/components/Breadcrumbs/Breadcrumbs";
import Image from "next/image";
import fetchData from "@/app/utils/fetchData";
import { notFound } from "next/navigation";
import { SideBarMenu } from "@/app/components";
import styles from "./style.module.scss";

type PageResponse = {
  data: {
    meta_title: string;
    meta_descpiption: string;
    title: string;
    [key: string]: any; // any type for any key
  };
};

const apiUrl = `/api/stranicza-paczientam?` + `populate[documents][populate]=*`;

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

  const documents = page?.data?.documents;

  return (
    <main className="container">
      <Breadcrumbs secondLabel={page?.data?.title ?? "Пациентам"} />

      <div className={styles.page_wrapper}>
        <SideBarMenu />
        <div className={styles.content} id="section">
          <h1 className={styles.content__title}>Документы</h1>
          <ul className={styles.documents__list}>
            {documents?.map((item: any) => (
              <li className={styles.documents__item} key={item?.id}>
                <a
                  href={
                    item?.document?.url
                      ? `${process.env.NEXT_PUBLIC_API_SERVER}${item?.document?.url}`
                      : "#"
                  }
                  target={item?.document?.url ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/icons/document_icon.svg"
                    alt="icon"
                    width={30}
                    height={30}
                  />
                  <span>{item?.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
