import type { NewsItemType } from "@/app/types";
import styles from "./style.module.scss";
import { Slider, NewsCard } from "@/app/components";

export default function News({ data }: { data: NewsItemType[] }) {
  return (
    <section className={styles.doctors}>
      <div className="container">
        <div className={styles.doctors_wrapper}>
          <div className={styles.doctors__header}>
            <h2 className={styles.doctors__title}>Новости</h2>
            <p>
              Будьте в курсе — новинки, акции и рекомендации от «Биосфера ДВ»
            </p>
          </div>

          <Slider data={data} Card={NewsCard} slidesPerView={3} />
        </div>
      </div>
    </section>
  );
}
