"use client";

import { ArticlesCard } from "@/app/components";
import type { ArticleItemType } from "@/app/types";
import styles from "./style.module.scss";

export default function ContentPage({ data }: { data: ArticleItemType[] }) {
  console.log(data);
  return (
    <section className={styles.news}>
      <h2 className={styles.news__title}>
        Будьте в курсе — статьи и рекомендации от «Биосфера ДВ»
      </h2>
      <div className={styles.list}>
        {data && data.length > 0
          ? data.map((item) => (
              <ArticlesCard key={item.id} data={item as ArticleItemType} />
            ))
          : "Не удалось загрузить новости"}
      </div>
    </section>
  );
}
