"use client";

import { NewsCard } from "@/app/components";
import type { NewsItemType } from "@/app/types";
import styles from "./style.module.scss";

export default function ContentPage({ data }: { data: NewsItemType[] }) {
  return (
    <section className={styles.news}>
      <h2 className={styles.news__title}>
        Будьте в курсе — новинки, акции и рекомендации от «Биосфера ДВ»
      </h2>
      <div className={styles.list}>
        {data && data.length > 0
          ? data.map((item) => (
              <NewsCard key={item.id} data={item as unknown as NewsItemType} />
            ))
          : "Не удалось загрузить новости"}
      </div>
    </section>
  );
}
