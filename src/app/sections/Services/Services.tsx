"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimateElement } from "@/app/components";
import styles from "./style.module.scss";

const servicesList = [
  { image: "/images/services-1.webp", title: "Терапия", link: "#" },
  { image: "/images/services-2.webp", title: "Неврология", link: "#" },
  { image: "/images/services-3.webp", title: "Эндокринология", link: "#" },
  { image: "/images/services-4.webp", title: "Диагностика", link: "#" },
];

export default function Services() {
  return (
    <section className={styles.services} id="services">
      <div className="container">
        <div className={styles.services_wrapper}>
          <div className={styles.services__header}>
            <AnimateElement>
              <h2 className={styles.services__title}>
                <span className="text-gradient">Медицинские услуги,</span>{" "}
                которые соответствуют вашим потребностям
              </h2>
            </AnimateElement>
            <AnimateElement element="p" animationName="fadeUp">
              Мы сосредоточены на результатах и вашем комфорте, предоставляя
              широкий спектр медицинских услуг, основанных на&nbsp;передовых
              технологиях
            </AnimateElement>
          </div>

          <ul className={styles.services_list}>
            {servicesList.map((item) => (
              <li key={item.title} className={styles.services_item}>
                <Link className={styles.services_item_link} href={item.link}>
                  <svg
                    width="91"
                    height="79"
                    viewBox="0 0 91 79"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles.services_item_svg}
                  >
                    <title>{item.title}</title>
                    <path
                      className={styles.services_item_svg_path_1}
                      d="M7.62639 8.64324C7.62639 2.93436 2.37265 0.508426 0 0H68.1291C89.9914 0 90.4998 13.7275 90.4998 25.9297V78.2976C90.4998 70.9763 82.7039 69.8238 78.806 70.1628C52.3679 70.1628 44.7415 67.548 26.4381 51.8594C12.2022 39.6572 7.62639 16.7781 7.62639 8.64324Z"
                    />
                    <path
                      className={styles.services_item_svg_path_2}
                      d="M50.1198 37.1467L64.1465 23.1197M64.1465 23.1197L50.1196 23.1197M64.1465 23.1197L64.1466 35.9269"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  <Image
                    className={`${styles.services_item_image} dsv-image`}
                    src={item.image}
                    alt={item.title}
                    width={337}
                    height={347}
                  />
                  <h3 className={styles.services_item_title}>{item.title}</h3>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
