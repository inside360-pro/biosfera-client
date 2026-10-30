import fetchData from "@/app/utils/fetchData";
import formatDate from "@/app/utils/formatDate";

import styles from "../style.module.scss";
import Breadcrumbs from "@/app/components/Breadcrumbs/Breadcrumbs";
import type { ArticleItemType } from "@/app/types";
import { notFound } from "next/navigation";
import { ArticlesCard, ContentRenderer, DoctorCard } from "@/app/components";
import type { ContentItem } from "@/app/components/ContentRenderer/ContentRenderer";
import Image from "next/image";
import type { Metadata } from "next";

interface ApiListResponse {
  data?: ArticleItemType[];
}

function articleBySlugUrl(slug: string) {
  return `/api/articles?filters[slug][$eq]=${encodeURIComponent(slug)}&populate[cover]=true&populate[poster]=true&populate[Seo]=true&populate[vrachi][populate]=*`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await fetchData<ApiListResponse>(articleBySlugUrl(slug));
  const article = page?.data?.[0];
  if (!article) return notFound();
  const title = article.Seo?.metaTitle?.trim() || `Биосфера ДВ | ${article.title ?? "Статья"}`;
  const description = article.Seo?.metaDescription?.trim() || article.title;
  const imagePath = article.cover?.url;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: imagePath
        ? [
            {
              url: new URL(imagePath, process.env.NEXT_PUBLIC_API_SERVER).toString(),
              width: 600,
              height: 300,
              alt: article?.title,
            },
          ]
        : [],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let page: ApiListResponse | null = null;

  try {
    page = await fetchData<ApiListResponse>(articleBySlugUrl(slug));
  } catch {
    return notFound();
  }

  const article = page?.data?.[0];

  if (!article) {
    return notFound();
  }

  let relatedArticles: ArticleItemType[] = [];
  let relatedFailed = false;
  try {
    const related = await fetchData<ApiListResponse>(
      `/api/articles?filters[slug][$ne]=${encodeURIComponent(slug)}&populate=*`,
    );
    relatedArticles = related.data ?? [];
  } catch {
    relatedFailed = true;
  }

  const domain = process.env.NEXT_PUBLIC_API_SERVER ?? "";
  const imagePath = article.cover?.url;
  const imageSrc = imagePath ? new URL(imagePath, domain).toString() : "/placeholder1.svg";

  return (
    <>
      <div className="container">
        <Breadcrumbs
          secondLink="/articles"
          secondLabel="Статьи"
          thirdLabel={article.title}
        />
        <article className={styles.article}>
          <div className={styles.article__hero}>
            <div className={styles.article__image}>
              <Image
                className="dsv-image"
                src={imageSrc}
                alt={article.title ?? "Статья"}
                width={1440}
                height={460}
                loading="lazy"
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MiIgaGVpZ2h0PSIxMTg5IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNjY2MiIC8+PC9zdmc+"
              />
            </div>
            <div className={styles.article__date}>
              {formatDate(article.publishedAt)}
            </div>
          </div>

          <div className={styles.article__body}>
            {article.vrachi?.name && (
              <aside className={styles.article__author}>
                <h2>Автор</h2>
                <DoctorCard data={article.vrachi} />
              </aside>
            )}
            <div className={styles.article__info}>
              <h1 className={styles.article__title}>{article.title}</h1>
              <ContentRenderer
                content={article.content as unknown as ContentItem[]}
              />
            </div>
          </div>
        </article>
      </div>

      {relatedArticles.length > 0 || relatedFailed ? (
        <section className={`${styles.news} ${styles.section}`}>
          <div className="container">
            <h2 className={styles.costs__title}>
              Вам может быть <span className="text-gradient">интересно</span>
            </h2>
            <div className={styles.list}>
              {relatedArticles.length > 0
                ? relatedArticles.slice(0, 3).map((item) => (
                    <ArticlesCard key={item.id} data={item} />
                  ))
                : "Не удалось загрузить статьи"}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
