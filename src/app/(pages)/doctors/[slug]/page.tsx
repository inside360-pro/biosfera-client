import { notFound } from "next/navigation";
import Image from "next/image";

import fetchData from "@/app/utils/fetchData";
import { ContentRenderer } from "@/app/components";
import Breadcrumbs from "@/app/components/Breadcrumbs/Breadcrumbs";
import type { ContentItem } from "@/app/components/ContentRenderer/ContentRenderer";
import styles from "./style.module.scss";

type DoctorItem = {
  main_photo?: { url?: string };
  name?: string;
  meta_title?: string;
  description?: string;
  title?: string;
  specialization?: string;
  experience?: string;
  cost?: string;
  medflex_link?: string;
  education_link?: string;
  accreditation_link?: string;
  skills?: ContentItem[];
  education?: ContentItem[];
  accreditation?: ContentItem[];
};

type PageResponse = {
  data?: DoctorItem[] | null;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await fetchData<PageResponse>(
    `/api/vrachis?filters[slug][$eq]=${slug}&populate=*`,
  );

  return {
    title: page?.data?.[0]?.meta_title ?? "",
    description: page?.data?.[0]?.description ?? "",
    openGraph: {
      title: `${page?.data?.[0]?.meta_title}`,
      description: page?.data?.[0]?.description,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_API_SERVER}${page?.data?.[0]?.main_photo?.url}`,
          width: 600,
          height: 300,
          alt: page?.data?.[0]?.title,
        },
      ],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // burdukovskaya-natalya-viktorovna
  // savinov-arkadij-aleksandrovich
  // siprashvili-darya-andreevna
  let page: PageResponse | null = null;
  const domain = process.env.NEXT_PUBLIC_API_SERVER ?? "";

  try {
    page = await fetchData<PageResponse>(
      `/api/vrachis?filters[slug][$eq]=${slug}&populate=*`,
    );
  } catch {
    return notFound();
  }
  if (!page?.data || (Array.isArray(page.data) && page.data.length === 0)) {
    return notFound();
  }

  const data = page?.data?.[0];
  const imageSrc = data?.main_photo?.url
    ? `${domain}${data?.main_photo?.url}`
    : "/placeholder1.svg";

  return (
    <main>
      <div className="container">
        <Breadcrumbs
          secondLink="/doctors"
          secondLabel="Врачи"
          thirdLabel={data?.name}
        />

        <div className={styles.page_wrappper}>
          <div className="relative">
            <div className={styles.image_wrapper}>
              <Image
                className={`${styles.image} dsv-image`}
                src={imageSrc}
                alt={data?.name ?? ""}
                width={461}
                height={461}
                loading="lazy"
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MiIgaGVpZ2h0PSIxMTg5IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNjY2MiIC8+PC9zdmc+"
              />
              {/* Видеовизитка пока отключена */}
              {/* <a href="#" className={styles.video_link}>
                                <span>Посмотреть видеовизитку</span>
                                <Image
                                    src="/icons/play-icon.svg"
                                    alt="play"
                                    width={47}
                                    height={47}
                                />
                            </a> */}
            </div>
          </div>

          <div>
            <div className={styles.content_description}>
              <h1 className={styles.title}>{data?.name ?? ""}</h1>

              <p className={styles.content_description_title}>Специализация:</p>
              <p className={styles.content_description_value}>
                {data?.specialization ?? ""}
              </p>

              <p className={styles.content_description_title}>Стаж работы:</p>
              <p className={styles.content_description_value}>
                {data?.experience ?? ""}
              </p>

              <p className={styles.content_description_title}>
                Стоимость приема:
              </p>
              <p className={styles.content_description_value}>
                {data?.cost ?? ""}
              </p>

              <a
                className={styles.button}
                href={data?.medflex_link}
                target="_blank"
              >
                Записаться на прием
              </a>
            </div>

            <div className={styles.content}>
              <div className={styles.content_item}>
                <h2 className={`${styles.title} text-gradient`}>
                  Профессиональные навыки и знания
                </h2>
                <ContentRenderer content={data?.skills ?? []} />
              </div>
              <div className={styles.content_item}>
                <h2 className={`${styles.title} text-gradient`}>Образование</h2>
                <ContentRenderer content={data?.education ?? []} />
                {/* <a
                  className={styles.button}
                  href={data?.education_link}
                  target="_blank"
                >
                  Посмотреть диплом
                </a> */}
              </div>
              <div className={styles.content_item}>
                <h2 className={`${styles.title} text-gradient`}>
                  Аккредитации
                </h2>
                <ContentRenderer content={data?.accreditation ?? []} />
                <a
                  className={styles.button}
                  href={data?.accreditation_link}
                  target="_blank"
                >
                  Посмотреть документы
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
