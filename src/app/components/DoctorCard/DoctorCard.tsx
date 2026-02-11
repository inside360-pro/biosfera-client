"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./style.module.scss";

export default function DoctorCard({ data }: { data: any }) {
  return (
    <div className={styles.doctors__card}>
      <div className={styles.doctors__card_info}>
        <Link className={styles.card_link} href="#">
          <Image
            src="/icons/arrow-icon.svg"
            alt="Doctor"
            width={20}
            height={20}
          />
        </Link>

        <Image
          src={data?.image || "/images/doctors/placeholder-person.webp"}
          alt={data?.name}
          width={136}
          height={136}
          className="dsv-image"
        />
        <div className={styles.label}>
          <p className={`${styles.label_info} text-gradient`}>{data.label}</p>
        </div>

        <h3 className={styles.card_title}>{data.name}</h3>
        <p className={styles.card_subtitle}>{data.description}</p>
      </div>

      <a href={data.link} className={styles.button}>
        Записаться на прием
      </a>
    </div>
  );
}
