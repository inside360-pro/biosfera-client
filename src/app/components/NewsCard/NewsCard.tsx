"use client";
import styles from "./style.module.scss";
import Image from "next/image";
import Link from "next/link";

export default function DoctorCard({ data }: { data: any }) {
    return (
        <Link href="#" className={`${styles.news__item} nebo`}>
            <Image className="dsv-image" src={data?.image} alt="News" width={460} height={425} />
            <div className={styles.news_label}>{data?.label}</div>
            <h3 className={styles.news__title}>{data?.title}</h3>
        </Link>
    )
}