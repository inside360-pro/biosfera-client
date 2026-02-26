import fetchData from "@/app/utils/fetchData";
import fetchMedflexData from "@/app/utils/fetchMedflexData";
import formatDate from "@/app/utils/formatDate";

import styles from "../style.module.scss";
import Breadcrumbs from "@/app/components/Breadcrumbs/Breadcrumbs";
import type { NewsItemType } from "@/app/types";
import { notFound } from "next/navigation";
import { ContentRenderer, NewsCard } from "@/app/components";
import type { ContentItem } from "@/app/components/ContentRenderer/ContentRenderer";
import CostItemMed from "@/app/components/CostItemMed/CostItemMed";
import Image from "next/image";
import { Doctors } from "@/app/sections";

interface ApiResponse {
  data: NewsItemType;
}

interface ApiListResponse<T> {
  data?: T[];
}

type MedflexService = {
  id: number | string;
  name: string;
  price?: number | string;
};

interface MedflexPricesResponse {
  data?: {
    services?: MedflexService[];
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const page = await fetchData<ApiResponse>(`/api/novostis/${id}?populate=*`);

  return {
    title: `Биосфера ДВ | ${page?.data?.title}`,
    description: page?.data?.description,
    openGraph: {
      title: `Биосфера ДВ | ${page?.data?.title}`,
      description: page?.data?.description,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_API_SERVER}${page?.data?.image?.url}`,
          width: 600,
          height: 300,
          alt: page?.data?.title,
        },
      ],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let page: ApiResponse | null = null;

  try {
    page = await fetchData<ApiResponse>(`/api/novostis/${id}?populate=*`);
  } catch {
    return notFound();
  }

  if (!page?.data) {
    return notFound();
  }

  // тут получаем цены услуг из медифлекса по клинике (lpu_id)
  // https://api.medflex.ru/services/prices/?lpu_id=**********

  const prices = await fetchMedflexData<MedflexPricesResponse>(
    `/services/prices/?lpu_id=${process.env.NEXT_PUBLIC_CLINIC_ID}`,
  );
  const services = prices.data?.services ?? [];

  // Запрос на получение всех новостей отфильтрованных по isRecommended = true
  const recommendedNews = await fetchData<ApiListResponse<NewsItemType>>(
    `/api/novostis?filters[isRecomended][$eq]=true&populate=*`,
  );
  const recommendedNewsData = recommendedNews.data ?? [];

  const domain = process.env.NEXT_PUBLIC_API_SERVER ?? "";
  const imageSrc = page?.data?.image?.url
    ? `${domain}${page?.data?.image?.url}`
    : "/placeholder1.svg";

  return (
    <>
      <div className="container">
        <Breadcrumbs
          secondLink="/news"
          secondLabel="Новости"
          thirdLabel={page?.data?.title}
        />
        <article className={styles.article}>
          <div className="relative">
            <div className={styles.article__image}>
              <Image
                className="dsv-image"
                src={imageSrc}
                alt="News"
                width={500}
                height={500}
                loading="lazy"
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MiIgaGVpZ2h0PSIxMTg5IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNjY2MiIC8+PC9zdmc+"
              />
            </div>
          </div>

          <div className={styles.article__info}>
            <div className={styles.article__date}>
              {formatDate(page?.data?.publishedAt)}
            </div>
            <h1 className={styles.article__title}>{page?.data?.title}</h1>
            <ContentRenderer
              content={page?.data?.content as unknown as ContentItem[]}
            />
          </div>
        </article>
      </div>

      <section className={`${styles.costs} ${styles.section}`}>
        <div className="container">
          <header className={styles.costs__header}>
            <h2 className={styles.costs__title}>
              <span className="text-gradient">Услуги медицинского центра </span>
              «Биосфера ДВ»
            </h2>
          </header>

          <ul className={styles.costs__list}>
            {services.map((item) => (
              <CostItemMed key={item.id} data={item} />
            ))}
          </ul>
        </div>
      </section>

      <Doctors />

      <section className={`${styles.news} ${styles.section}`}>
        <div className="container">
          <h2 className={styles.costs__title}>
            Вам может быть <span className="text-gradient">интересно</span>
          </h2>
          <div className={styles.list}>
            {recommendedNewsData && recommendedNewsData.length > 0
              ? recommendedNewsData.map((item: NewsItemType) => (
                  <NewsCard key={item.id} data={item} />
                ))
              : "Не удалось загрузить новости"}
          </div>
        </div>
      </section>
    </>
  );
}
