import Breadcrumbs from "@/app/components/Breadcrumbs/Breadcrumbs";
import { Doctors } from "@/app/sections";

import styles from "./style.module.scss";
import { DoctorCard } from "@/app/components";
export const metadata = {
  title: "Биосфера ДВ | Врачи центра ",
  description: "Врачи центра Биосфера ДВ",
};

const data = [
  {
    id: 1,
    name: "Бурдуковская Наталья Викторовна",
    image: "/images/doctors/image-1.webp",
    label: "Стаж 25 лет",
    description: "Главный врач, Врач функциональной диагностики, Врач-терапевт",
    link: "https://booking.medflex.ru?user=be54557cf76e37ed7e2b8308eecb3e44&employeeId=166638&source=4",
  },
  {
    id: 2,
    name: "Савинов Аркадий Александрович",
    image: "/images/doctors/image-2.webp",
    label: "Стаж 14 лет",
    description: "Врач-неврологт",
    link: "https://booking.medflex.ru?user=be54557cf76e37ed7e2b8308eecb3e44&employeeId=1351198&source=4",
  },
  {
    id: 3,
    name: "Сипрашвили Дарья Андреевна",
    image: "/images/doctors/image-3.jpg",
    label: "Стаж 3 года",
    description: "Эндокринолог",
    link: "https://booking.medflex.ru?user=be54557cf76e37ed7e2b8308eecb3e44&employeeId=1095027&source=4",
  },
];

export default async function DoctorsPage() {
  return (
    <div className="container">
      <Breadcrumbs secondLabel="Врачи центра " />
      <h1 className={styles.promo_title}>
        <span className="text-gradient">Профессиональная </span>
        команда врачей
      </h1>
      <p className={styles.promo_description}>
        Квалифицированные специалисты с современным взглядом на диагностику и
        лечение.
      </p>

      <ul className={styles.list}>
        {data.map((item) => (
          <li key={item.id} className={styles.item1}>
            <DoctorCard data={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
