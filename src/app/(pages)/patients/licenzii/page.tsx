import Breadcrumbs from "@/app/components/Breadcrumbs/Breadcrumbs";
import fetchData from "@/app/utils/fetchData";
import { notFound } from "next/navigation";
import { SideBarMenu } from "@/app/components";
import Image from "next/image";
import styles from "../style.module.scss";

type PageResponse = {
  data: {
    meta_title: string;
    meta_descpiption: string;
    title: string;
    [key: string]: any; // any type for any key
  };
};

const apiUrl = `/api/stranicza-paczientam-liczenczii?populate=*`;

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

  const licenses = page?.data;
  console.log("licenses", licenses);

  return (
    <main className="container">
      <Breadcrumbs secondLabel={page?.data?.title ?? "Пациентам"} />

      <div className={styles.page_wrapper}>
        <SideBarMenu />
        <div className={styles.content} id="section">
          <h1 className={styles.content__title}>
            {licenses?.title ?? "Лицензии"}
          </h1>

          <p className={styles.description}>{licenses?.description ?? ""}</p>
          <div className={styles.licenses_wrapper}>
            <div className={styles.licenses_content}>
              <div className={styles.licenses_block}>
                <div className={styles.licenses_block_item}>
                  <p>
                    Лицензия:{" "}
                    <span className="text-gradient">
                      {licenses?.number ?? ""}
                    </span>
                  </p>
                  <p>
                    Дата выдачи:{" "}
                    <span className="text-gradient">
                      {licenses?.data ?? ""}
                    </span>
                  </p>
                </div>

                <a
                  className={styles.licenses_button}
                  href={
                    licenses.view.url
                      ? `${process.env.NEXT_PUBLIC_API_SERVER}${licenses?.view?.url}`
                      : "#"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ознакомиться с лицензией
                </a>
              </div>
            </div>
            <div className={styles.licenses_images}>
              {licenses?.images?.length > 0 &&
                licenses?.images?.map((image: any) => (
                  <Image
                    key={image.id}
                    src={`${process.env.NEXT_PUBLIC_API_SERVER}${image?.url}`}
                    alt={image?.name ?? "licenses_images"}
                    width={335}
                    height={510}
                    className="dsv-image"
                    priority
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MiIgaGVpZ2h0PSIxMTg5IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNjY2MiIC8+PC9zdmc+"
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
