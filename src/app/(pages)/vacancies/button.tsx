"use client";

import { usePopupStore } from "@/app/store/popupStore";
import styles from "./style.module.scss";

export default function PromoButton() {
  const { togglePopupState } = usePopupStore();

  return (
    <button
      type="button"
      className={styles.promo_item_button}
      onClick={togglePopupState}
    >
      Откликнуться
    </button>
  );
}
