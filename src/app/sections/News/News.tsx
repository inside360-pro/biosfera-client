import styles from "./style.module.scss";
import { Slider, NewsCard } from "@/app/components";

const data = [
    {
        id: 1,
        title: "Программы для поддержания здоровья в зимний период",
        image: "/images/slide-1.webp",
        label: "1 января 2026",
        link: "#",
    },
    {
        id: 2,
        title: "Программы для поддержания здоровья в зимний период",
        image: "/images/new-1.webp",
        label: "1 января 2026",
        link: "#",
    },
    {
        id: 3,
        title: "Программы для поддержания здоровья в зимний период",
        image: "/images/new-1.webp",
        label: "1 января 2026",
        link: "#",
    },
    {
        id: 4,
        title: "Программы для поддержания здоровья в зимний период",
        image: "/images/new-1.webp",
        label: "1 января 2026",
        link: "#",
    },
    {
        id: 5,
        title: "Программы для поддержания здоровья в зимний период",
        image: "/images/new-1.webp",
        label: "1 января 2026",
        link: "#",
    },
]

export default function News() {

    return (
        <section className={styles.doctors}>
            <div className="container">
                <div className={styles.doctors_wrapper}>
                    <div className={styles.doctors__header}>
                        <h2 className={styles.doctors__title}>Новости</h2>
                        <p>Будьте в курсе — новинки, акции и рекомендации от «Биосфера ДВ»</p>
                    </div>
               
                    <Slider data={data} Card={NewsCard} slidesPerView={3}/>
                </div>
            </div>
        </section>
    )
}