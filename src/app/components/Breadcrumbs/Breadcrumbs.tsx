"use client";

import Link from "next/link";
import type { FC } from "react";
import styles from "./style.module.scss";

interface BreadcrumbsProps {
  secondLink?: string;
  secondLabel?: string;
  thirdLink?: string;
  thirdLabel?: string;
  fourthLabel?: string;
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({
  secondLink = "/",
  secondLabel,
  thirdLink,
  thirdLabel,
  fourthLabel,
}) => {
  const resolvedThirdLabel = thirdLabel ?? (fourthLabel ? fourthLabel : undefined);
  const resolvedFourthLabel = thirdLabel ? fourthLabel : undefined;

  return (
    <nav className={styles.breadcrumbs}>
      <ul>
        <li className={styles.crumb}>
          <Link href="/">Главная</Link>
        </li>
        {secondLabel && (
          <li className={styles.crumb}>
            {resolvedThirdLabel ? (
              <Link href={secondLink}>{secondLabel}</Link>
            ) : (
              <span className={styles.active}>{secondLabel}</span>
            )}
          </li>
        )}
        {resolvedThirdLabel && (
          <li className={styles.crumb}>
            {resolvedFourthLabel ? (
              thirdLink ? (
                <Link href={thirdLink}>{resolvedThirdLabel}</Link>
              ) : (
                <span>{resolvedThirdLabel}</span>
              )
            ) : (
              <span className={styles.active}>{resolvedThirdLabel}</span>
            )}
          </li>
        )}
        {resolvedFourthLabel && (
          <li
            className={`${styles.crumb} ${styles.active} ${styles.lastCrumb}`}
          >
            <span>{resolvedFourthLabel}</span>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
