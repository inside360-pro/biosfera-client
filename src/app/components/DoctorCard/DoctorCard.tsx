"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./style.module.scss";

export default function DoctorCard({ data }: { data: any }) {
  const domain = process.env.NEXT_PUBLIC_API_SERVER ?? "";

  const imageSrc = data?.small_photo?.url
    ? `${domain}${data?.small_photo?.url}`
    : "/placeholder1.svg";

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
          src={imageSrc}
          alt={data?.name}
          width={136}
          height={136}
          className="dsv-image"
        />
        <div className={styles.label}>
          <p className={`${styles.label_info} text-gradient`}>{data?.experience}</p>
        </div>

        <h3 className={styles.card_title}>{data?.name}</h3>
        <p className={styles.card_subtitle}>{data?.specialization}</p>
      </div>

      <Link href={`/doctors/${data?.slug}`} className={styles.button}>
        Записаться на прием
      </Link>
    </div>
  );
}
