"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ReviewsPopup, StarRating } from "@/app/components";
import fetchData from "@/app/utils/fetchData";
import styles from "./style.module.scss";
import formatDate from "@/app/utils/formatDate";

export type ReviewsItem = {
  name?: string,
  age?: string,
  review_text?: string,
  rating?: number,
  date?: string,
  publishedAt?: string,
};

export type ReviewsPageData = {
  data: ReviewsItem[];
};

export type ReviewsResponse = {
  data: ReviewsItem[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    }
  };
}

export default function ContentPage() {
  const [active, setActive] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(5);

  const [reviews, setReviews] = useState<ReviewsItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(false);

  const domain = process.env.NEXT_PUBLIC_DOMAIN ?? "";

  // для пагинации
  const PAGE_SIZE: number = 2; // количество отзывов на странице
  const [page, setPage] = useState<number>(1);
  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  }

  useEffect(() => {
    const loadData = async (): Promise<void> => {
      setIsLoading(true);
      try {
        const url =
          `${domain}api/otzyvies` +
          `?populate=*` +
          `&filters[active][$eq]=true` +
          `&pagination[page]=${page}&pagination[pageSize]=${PAGE_SIZE}` +
          `&sort=createdAt:desc`
          ;

        const newReviews: ReviewsResponse = await fetchData(url);
        setReviews(prev => [...prev, ...newReviews.data]);
        setHasMore(page < newReviews.meta.pagination.pageCount);
        setIsLoading(false);

      } catch (error) {
        console.error('Произошла ошибка загрузки отзывов', error);
      }
    };

    loadData();
  }, [page]);

  return (
    <>
      <section className={`${styles.price} ${styles.section}`}>
        <div className="container">
          <header className={styles.header_wrapper}>
            <h1 className={styles.title}>
              <span className="text-gradient">Что говорят </span>
              наши пациенты
            </h1>
            <button className={styles.button} onClick={() => setActive(true)}>Оставить отзыв</button>
          </header>
          <p className={styles.text}>Мы ценим доверие наших пациентов и внимательно относимся к каждому отзыву. Обратная связь помогает нам становиться лучше и поддерживать высокий уровень медицинской помощи и сервиса.</p>


          <ul className={styles.reviews_list}>

            {reviews && reviews.length > 0 && reviews.map((item, index) => (
              <li className={styles.reviews_item} key={`${item?.name}-${index ?? 0}`}>
                <Image
                  className="dsv-image"
                  src={"/icons/quotes.svg"}
                  alt="quotes"
                  width={39}
                  height={35}
                />
                <div>
                  <div className={styles.name}>{item?.name}, <span>{item?.age}</span></div>
                  <p className={styles.reviews_text}>{item?.review_text}</p>
                </div>
                <footer className={styles.reviews_item__footer}>
                  <span className={styles.reviews_item__date}>{formatDate(item.publishedAt)}</span>
                  <StarRating setRating={setRating} rating={item?.rating} />
                </footer>
              </li>
            ))}
          </ul>

          {
            hasMore &&
            <button
              onClick={handleLoadMore}
              className={styles.button}
            >
              {isLoading ? 'загрузка...' : 'загрузить еще'}
            </button>
          }

        </div>
      </section>

      <ReviewsPopup setActive={setActive} active={active} />
    </>
  );
}
