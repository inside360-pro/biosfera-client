import styles from "./style.module.scss";
import { DoctorCard, Slider } from "@/app/components";

import fetchData from "@/app/utils/fetchData";
import { notFound } from "next/navigation";

type PageResponse = {
  data?: Array<Record<string, unknown>> | null;
}

export default async function Doctors() {
  const domain = process.env.NEXT_PUBLIC_API_SERVER ?? "";
  const page = await fetchData<PageResponse>(`/api/vrachis?populate=*`);

  const data = page?.data;

  return (
    <section className={styles.doctors}>
      <div className="container">
        <div className={styles.doctors_wrapper}>
          <div className={styles.doctors__header}>
            <h2 className={styles.doctors__title}>
              <span className="text-gradient">Врачи, которые разбираются</span>{" "}
              и&nbsp;берут ответственность
            </h2>
            <p>
              Консультации без спешки, понятные рекомендации и сопровождение
              пациента на всех этапах — от&nbsp;первого приёма
              до&nbsp;результата
            </p>
          </div>

          <Slider data={data ?? []} Card={DoctorCard} slidesPerView={4} loop={false} />
        </div>
      </div>
    </section>
  );
}
