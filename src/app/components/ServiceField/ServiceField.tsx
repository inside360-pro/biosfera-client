"use client";

import { useId } from "react";
import type { FieldValues, Path, UseFormRegister } from "react-hook-form";
import styles from "./style.module.scss";

export default function ServiceField<T extends FieldValues>({
  register,
}: {
  register: UseFormRegister<T>;
}) {
  const id = useId();

  return (
    <div className={styles.field} aria-hidden="true">
      <label htmlFor={id}>Название услуги</label>
      <input
        id={id}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        {...register("service" as Path<T>)}
      />
    </div>
  );
}
