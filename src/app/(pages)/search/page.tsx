"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import styles from "./style.module.scss";

import fetchData from "@/app/utils/fetchData";

type DoctorSearchItem = {
  documentId?: string;
  name?: string;
  slug?: string;
  specialization?: string;
  experience?: string;
};

type NewsSearchItem = {
  id?: number;
  documentId: string;
  title?: string;
  description?: string;
  publishedAt?: string;
};

type ApiListResponse<T> = {
  data?: T[];
};

type CategoryKey = string;
type Category<TItem> = {
  key: CategoryKey;
  title: string;
  buildUrl: (query: string) => string;
  getItemKey: (item: TItem, index: number) => string;
  renderItem: (item: TItem) => React.ReactNode;
};

const CATEGORIES = [
  {
    key: "news",
    title: "Новости",
    buildUrl: (q: string) =>
      `/api/novostis?filters[title][$containsi]=${encodeURIComponent(q)}&populate=*`,
    getItemKey: (item: NewsSearchItem) => item.documentId,
    renderItem: (item: NewsSearchItem) => (
      <Link href={`/news/${item.documentId}`}>
        {item.title ?? "Без названия"}
      </Link>
    ),
  } satisfies Category<NewsSearchItem>,
  {
    key: "doctors",
    title: "Врачи",
    buildUrl: (q: string) =>
      `/api/vrachis?filters[name][$containsi]=${encodeURIComponent(q)}&populate=*`,
    getItemKey: (item: DoctorSearchItem, index: number) =>
      item.slug ?? item.documentId ?? String(index),
    renderItem: (item: DoctorSearchItem) =>
      item.slug ? (
        <Link href={`/doctors/${item.slug}`}>{item.name ?? "Без имени"}</Link>
      ) : (
        <span>{item.name ?? "Без имени"}</span>
      ),
  } satisfies Category<DoctorSearchItem>,
] as const;

const CATEGORIES_BY_KEY = Object.fromEntries(
  CATEGORIES.map((c) => [c.key, c]),
) as Record<CategoryKey, Category<unknown>>;

function SearchResults() {
  const searchParams = useSearchParams();

  const query = (searchParams.get("query") ?? "").trim();
  const typeParam = (searchParams.get("type") ?? "").trim();

  const selectedKey = CATEGORIES_BY_KEY[typeParam] ? typeParam : "";
  const selectedCategories = selectedKey
    ? [CATEGORIES_BY_KEY[selectedKey]]
    : CATEGORIES;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<Record<CategoryKey, unknown[]>>({});

  const hasAnyResults =
    !!query &&
    selectedCategories.some((cat) => (results[cat.key]?.length ?? 0) > 0);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      setError(null);

      if (!query) {
        setResults({});
        return;
      }

      setLoading(true);
      try {
        const cats = selectedKey
          ? [CATEGORIES_BY_KEY[selectedKey]]
          : CATEGORIES;
        const entries = await Promise.all(
          cats.map(async (cat) => {
            const res = await fetchData<ApiListResponse<unknown>>(
              cat.buildUrl(query),
            );
            return [cat.key, res?.data ?? []] as const;
          }),
        );

        if (cancelled) return;
        setResults(Object.fromEntries(entries));
      } catch {
        if (cancelled) return;
        setError("Не удалось загрузить результаты поиска");
        setResults({});
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, [query, selectedKey]);

  return (
    <div className="container">
      <h1>Поиск</h1>

      {!query ? (
        <p>Введите запрос для поиска</p>
      ) : (
        <p>Результаты для: {query}</p>
      )}

      {loading && <p>Загрузка...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && query && !hasAnyResults && (
        <p>Ничего не найдено</p>
      )}

      {!loading &&
        !error &&
        query &&
        selectedCategories.map((cat) => {
          const items = results[cat.key] ?? [];
          if (items.length === 0) return null;

          return (
            <section className={styles.section} key={cat.key}>
              <h2>{cat.title}</h2>
              <ul className={styles.list}>
                {items.map((rawItem, index) => {
                  const item = rawItem as never;
                  return (
                    <li
                      className={styles.item}
                      key={cat.getItemKey(item, index)}
                    >
                      <Image
                        src="/icons/search-icon.svg"
                        alt="search-icon"
                        width={22}
                        height={22}
                      />
                      {cat.renderItem(item)}
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="container">
          <h1>Загрузка результатов поиска...</h1>
        </div>
      }
    >
      <SearchResults />
    </Suspense>
  );
}
