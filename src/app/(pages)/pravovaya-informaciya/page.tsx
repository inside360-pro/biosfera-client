import fetchData from "@/app/utils/fetchData";
import { notFound } from "next/navigation";

import Breadcrumbs from "@/app/components/Breadcrumbs/Breadcrumbs";
import Image from "next/image";
import { ContentRenderer, SideBarMenu } from "@/app/components";

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
const apiUrl2 = `/api/stranicza-paczientam-yuridicheskie-dannye?populate=*`;

export default async function PravovayaInformaciya() {
  let page: PageResponse | null = null;
  let page2: PageResponse | null = null;

  try {
    page = await fetchData<PageResponse>(apiUrl);
    page2 = await fetchData<PageResponse>(apiUrl2);
  } catch (error) {
    console.error("Ошибка при загрузке данных:", error);
  }

  if (!page?.data) {
    return notFound();
  }

  const documents = page?.data?.documents;
  const data = page2?.data;

  return (
    <main className="container">
      <Breadcrumbs secondLabel={"Правовая информация"} />

      <h1 className={styles.content__title}>Правовая информация</h1>
      <section className={styles.content} id="section">
        <h2 className={styles.content__title}>Документы</h2>
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
      </section>

      <div className={styles.content} id="section">
        <h1 className={styles.content__title}>
          {data?.title ?? "Юридические данные"}
        </h1>
        <ContentRenderer content={data?.content ?? []} />
      </div>
    </main>
  );
}
