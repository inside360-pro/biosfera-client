"use client";
import { useState, useEffect } from "react";
import styles from "./style.module.scss";
import Image from "next/image";
import Link from "next/link";

import { SliderGallery } from "@/app/components";

export default function Gallery() {

    return (
        <section className={styles.gallery}>
            <div className="container">
                <div className={styles.gallery__wrapper}>
                    <div className={styles.gallery__header}>
                        <h2>Галерея</h2>
                        <p>Мы создаём спокойную и комфортную среду, в которой пациент чувствует себя уверенно и безопасно</p>
                    </div>
                    <SliderGallery />
                </div>
            </div>
        </section>
    )
}
