"use client";
import styles from "./style.module.scss";

export default function Header() {
  return (
    <header>
      <h2 className={styles.color}>Header</h2>
      <p className={styles.text}>Header text paragraph</p>
    </header>
  );
}
