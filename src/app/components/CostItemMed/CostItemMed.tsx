"use client";

import Link from "next/link";
import styles from "./style.module.scss";

export default function CostItemMed({ data }: { data: any }) {
  return (
    <li className={styles.item}>
      <div className={styles.item__wrapper}>
        <h3 className={styles.item_title}>{data.name}</h3>
        <p className={styles.item_price}>от&nbsp;{data.price}&nbsp;₽</p>
      </div>
      <Link
        className={styles.item__link}
        href="https://booking.medflex.ru/?user=be54557cf76e37ed7e2b8308eecb3e44&type=services&filial=26438"
        target="_blank"
      >
        Записаться на&nbsp;прием
      </Link>
    </li>
  );
}
