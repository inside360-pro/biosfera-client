"use client";
import { useState, useEffect } from "react";
import styles from "./style.module.scss";
import Image from "next/image";
import Link from "next/link";
import { Slider } from "@/app/components";


export default function Doctors() {

    return (
        <section className={styles.doctors}>
            <div className="container">
                <div className={styles.doctors_wrapper}>
                    <div className={styles.doctors__header}>
                        <h2 className={styles.doctors__title}><span className="text-gradient">Врачи, которые разбираются</span> и&nbsp;берут ответственность</h2>
                        <p>Консультации без спешки, понятные рекомендации и сопровождение пациента на всех этапах — от&nbsp;первого приёма до&nbsp;результата</p>
                    </div>
                     
                    <Slider />
                </div>
            </div>
        </section>
    )
}