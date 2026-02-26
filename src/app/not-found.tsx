import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./not-found.module.scss";

export const metadata: Metadata = {
  title: "Биосфера ДВ | Страница не найдена",
  description: "Страница, которую вы ищете, не существует.",
};

export default function NotFound() {
  return (
    <section className={styles.notFound}>
      <div className="container">
        <h1 className="visually-hidden">Страница не найдена</h1>
        <div className={styles.notFound__wrapper}>
          <div className={styles.image_wrapper}>
            <Image
              className="dsv-image"
              src="/images/image-404-2.webp"
              alt="Страница не найдена"
              width={715}
              height={332}
              loading="lazy"
            />
          </div>
          <p>
            Страница не найдена. Проверьте ссылку или позвоните нам по номеру
          </p>
          <a className={styles.notFound__link} href="tel:+79243388189">
            +7 (924) 338-81-89
          </a>
          <Image
            className={`${styles.image_absolute} dsv-image`}
            src="/images/image-404-1.webp"
            alt="Страница не найдена"
            width={600}
            height={450}
          />
        </div>
      </div>
    </section>
  );
}
