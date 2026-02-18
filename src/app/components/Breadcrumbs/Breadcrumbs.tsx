"use client";

import Link from "next/link";
import type { FC } from "react";
import styles from "./style.module.scss";

interface BreadcrumbsProps {
  secondLink?: string;
  secondLabel?: string;
  thirdLabel?: string;
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({
  secondLink = "/",
  secondLabel,
  thirdLabel,
}) => {
  return (
    <nav className={styles.breadcrumbs}>
      <ul>
        <li className={styles.crumb}>
          <Link href="/">Главная</Link>
        </li>
        {secondLabel && (
          <li className={styles.crumb}>
            {thirdLabel ? (
              <Link href={secondLink}>{secondLabel}</Link>
            ) : (
              <span className={styles.active}>{secondLabel}</span>
            )}
          </li>
        )}
        {thirdLabel && (
          <li
            className={`${styles.crumb} ${styles.active} ${styles.lastCrumb}`}
          >
            <span>{thirdLabel}</span>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
