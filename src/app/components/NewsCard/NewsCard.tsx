"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./style.module.scss";

export default function DoctorCard({ data }: { data: any }) {
  return (
    <Link href="#" className={`${styles.news__item}`}>
      <Image
        className="dsv-image"
        src={data?.image}
        alt="News"
        width={460}
        height={425}
      />
      <div className={styles.news_label}>{data?.label}</div>
      <h3 className={styles.news__title}>{data?.title}</h3>

      <svg
        width="91"
        height="79"
        viewBox="0 0 91 79"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="News"
        className={styles.news__icon}
      >
        <title>Новость</title>
        <path
          d="M80.2249 4.45694C87.356 6.83397 90.6245 2.47608 90.6245 0V57.9402C90.6245 73.3909 75.9747 79.2344 70.5278 78.7392H0C5.94258 78.7392 5.9441 74.2823 5.9441 71.311C4.45845 49.0263 7.42823 37.1411 25.256 19.3134C43.0837 1.48565 71.311 1.48565 80.2249 4.45694Z"
          className={styles.path_1}
        />
        <path
          d="M42.6156 49.2669L55.7956 36.0867M55.7956 36.0867L42.6154 36.0867M55.7956 36.0867L55.7956 48.1208"
          strokeWidth="1.87926"
          strokeLinecap="round"
          className={styles.path_2}
        />
      </svg>
    </Link>
  );
}
