"use client";

import Image from "next/image";
import Script from "next/script";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { LoadingText, ReviewsPopup, StarRating } from "@/app/components";
import fetchData from "@/app/utils/fetchData";
import styles from "./style.module.scss";

export type ReviewsItem = {
  name?: string;
  age?: string;
  review_text?: string;
  rating?: number;
  date?: string;
  platform?: string;
  publishedAt?: string;
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
    };
  };
};

function ReviewText({ text }: { text?: string }) {
  const [expanded, setExpanded] = useState(false);
  const [overflow, setOverflow] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const el = textRef.current;
    if (!el || !text) return;

    const measure = () => {
      if (expanded) return;

      const computed = getComputedStyle(el);
      const probe = document.createElement("p");
      probe.textContent = text;
      probe.style.cssText = [
        "position:absolute",
        "visibility:hidden",
        "pointer-events:none",
        `width:${el.clientWidth}px`,
        `font:${computed.font}`,
        `line-height:${computed.lineHeight}`,
        `letter-spacing:${computed.letterSpacing}`,
        `word-break:${computed.wordBreak}`,
        `white-space:${computed.whiteSpace}`,
      ].join(";");
      document.body.appendChild(probe);
      const lineHeight = parseFloat(computed.lineHeight) || 0;
      const limit = lineHeight * 10;
      setOverflow(probe.scrollHeight > limit + 1);
      probe.remove();
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [text, expanded]);

  if (!text) return null;

  return (
    <>
      <p
        ref={textRef}
        className={`${styles.reviews_text}${expanded ? ` ${styles.reviews_text_expanded}` : ""}`}
      >
        {text}
      </p>
      {overflow && (
        <button
          type="button"
          className={styles.reviews_more}
          aria-expanded={expanded}
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? "Свернуть" : "Читать полностью"}
        </button>
      )}
    </>
  );
}

export default function ContentPage() {
  const [active, setActive] = useState<boolean>(false);
  const [, setRating] = useState<number>(5);

  const [reviews, setReviews] = useState<ReviewsItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(false);

  const domain = process.env.NEXT_PUBLIC_DOMAIN ?? "";

  // для пагинации
  const PAGE_SIZE: number = 4; // количество отзывов на странице
  const [page, setPage] = useState<number>(1);
  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    const loadData = async (): Promise<void> => {
      setIsLoading(true);
      try {
        const url =
          `${domain}/api/otzyvies` +
          `?populate=*` +
          `&filters[active][$eq]=true` +
          `&pagination[page]=${page}&pagination[pageSize]=${PAGE_SIZE}` +
          `&sort=createdAt:desc`;

        const newReviews: ReviewsResponse = await fetchData(url);
        setReviews((prev) =>
          page === 1 ? newReviews.data : [...prev, ...newReviews.data],
        );
        setHasMore(page < newReviews.meta.pagination.pageCount);
        setIsLoading(false);
      } catch (error) {
        console.error("Произошла ошибка загрузки отзывов", error);
      }
    };

    loadData();
  }, [page, domain]);

  return (
    <>
      <section className={`${styles.price} ${styles.section}`}>
        <div className="container">
          <header className={styles.header_wrapper}>
            <h1 className={styles.title}>
              <span className="text-gradient">Что говорят </span>
              наши пациенты
            </h1>
            <button
              type="button"
              className={styles.button}
              onClick={() => setActive(true)}
            >
              Оставить отзыв
            </button>
          </header>
          <p className={styles.text}>
            Мы ценим доверие наших пациентов и внимательно относимся к каждому
            отзыву. Обратная связь помогает нам становиться лучше и поддерживать
            высокий уровень медицинской помощи и сервиса.
          </p>

          {isLoading && reviews.length === 0 && (
            <LoadingText className={styles.text} />
          )}
          <ul className={styles.reviews_list}>
            {reviews &&
              reviews.length > 0 &&
              reviews.map((item, index) => (
                <li
                  className={styles.reviews_item}
                  key={`${item?.name}-${index ?? 0}`}
                >
                  <Image
                    className="dsv-image"
                    src={"/icons/quotes.svg"}
                    alt="quotes"
                    width={39}
                    height={35}
                  />
                  <div>
                    <div className={styles.name}>
                      {item?.name}
                      <span>{item.age ? `, ${item.age}` : ""}</span>
                    </div>
                    <ReviewText text={item?.review_text} />
                  </div>
                  <footer className={styles.reviews_item__footer}>
                    <div className={styles.reviews_item__date_wrapper}>
                      <p className={styles.reviews_item__date}>{item?.date}</p>
                      <p className={styles.reviews_item__platform}>
                        {item?.platform}
                      </p>
                    </div>

                    <span className={styles.reviews_item__platform}></span>
                    <StarRating setRating={setRating} rating={item?.rating} />
                  </footer>
                </li>
              ))}
          </ul>
          {hasMore && (
            <button
              type="button"
              onClick={handleLoadMore}
              className={styles.button}
            >
              {isLoading ? "загрузка..." : "загрузить еще"}
            </button>
          )}
        </div>
      </section>

      <section className={`${styles.reviews} ${styles.section}`}>
        <div className="container">
          <div id="pd_widget_big" data-lpu="112840">
            <div className="pd_rate_header">
              Отзывы о медицинском центре «Биосфера ДВ»
              <br />
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="pd_rate_new"
                href="https://prodoctorov.ru/new/rate/lpu/112840/"
              >
                Оставить отзыв
              </a>
            </div>
            <div id="pd_widget_big_content"></div>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="pd_read_all"
              href="https://prodoctorov.ru/vladivostok/lpu/112840-medicinskiy-centr-biosfera-dv/#otzivi"
            >
              Читать все отзывы
            </a>
            <span id="pd_powered_by">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://prodoctorov.ru"
              >
                <img
                  className="pd_logo"
                  src="https://prodoctorov.ru/static/_v1/pd/logos/logo-pd-widget.png"
                  alt="logo"
                />
              </a>
            </span>
          </div>
        </div>
      </section>

      <Script defer src="https://prodoctorov.ru/static/js/widget_big.js?v7" />

      <ReviewsPopup setActive={setActive} active={active} />
    </>
  );
}
