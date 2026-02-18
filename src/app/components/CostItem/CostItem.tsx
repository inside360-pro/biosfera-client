import Link from "next/link";
import type { CostItemType } from "@/app/types";
import styles from "./style.module.scss";

export default function CostItem({ data }: { data: CostItemType }) {
  return (
    <li className={styles.item}>
      <div className={styles.item__wrapper}>
        <h3 className={styles.item_title}>{data.title}</h3>
        <p className={styles.item_price}>{data.price}</p>
      </div>
      <Link href={data.link ?? ""} className={styles.item__link}>
        Записаться на&nbsp;прием
      </Link>
    </li>
  );
}
