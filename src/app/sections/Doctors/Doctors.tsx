"use client";
import { useState, useEffect } from "react";
import styles from "./style.module.scss";
import Image from "next/image";
import Link from "next/link";
import { DoctorCard, Slider } from "@/app/components";

const data = [
    {
        id: 1,
        name: "Бурдуковская Наталья Викторовна",
        image: "/images/doctors/image-1.webp",
        label: "Стаж 25 лет",
        description: "Главный врач, Врач функциональной диагностики, Врач-терапевт",
        link: "#",
    },
    {
        id: 2,
        name: "Савинов Аркадий Александрович",
        image: "/images/doctors/image-2.webp",
        label: "Стаж 14 лет",
        description: "Врач-неврологт",
        link: "#",
    },
    {
        id: 3,
        name: "2Бурдуковская Наталья Викторовна",
        image: "/images/doctors/image-1.webp",
        label: "Стаж 25 лет",
        description: "Главный врач, Врач функциональной диагностики, Врач-терапевт",
        link: "#",
    },
    {
        id: 4,
        name: "2Савинов Аркадий Александрович",
        image: "/images/doctors/image-2.webp",
        label: "Стаж 14 лет",
        description: "Врач-неврологт",
        link: "#",
    },
    {
        id: 5,
        name: "2Бурдуковская Наталья Викторовна",
        image: "/images/doctors/image-1.webp",
        label: "Стаж 25 лет",
        description: "Главный врач, Врач функциональной диагностики, Врач-терапевт",
        link: "#",
    },
    {
        id: 6,
        name: "2Савинов Аркадий Александрович",
        image: "/images/doctors/image-2.webp",
        label: "Стаж 14 лет",
        description: "Врач-неврологт",
        link: "#",
    },
]

export default function Doctors() {

    return (
        <section className={styles.doctors}>
            <div className="container">
                <div className={styles.doctors_wrapper}>
                    <div className={styles.doctors__header}>
                        <h2 className={styles.doctors__title}><span className="text-gradient">Врачи, которые разбираются</span> и&nbsp;берут ответственность</h2>
                        <p>Консультации без спешки, понятные рекомендации и сопровождение пациента на всех этапах — от&nbsp;первого приёма до&nbsp;результата</p>
                    </div>
                
                    <Slider data={data} Card={DoctorCard} slidesPerView={4}/>
                </div>
            </div>
        </section>
    )
}