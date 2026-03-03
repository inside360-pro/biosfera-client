"use client";

import Image from "next/image";
import { usePopupStore } from "@/app/store/popupStore";
import styles from "./style.module.scss";

export default function ContentPage() {
  const { togglePopupState } = usePopupStore();
  return <section className={styles.map}>Документы</section>;
}
