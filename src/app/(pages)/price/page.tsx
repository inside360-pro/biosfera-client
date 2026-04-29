import Breadcrumbs from "@/app/components/Breadcrumbs/Breadcrumbs";
import ContentPage from "./ContentPage";
import styles from "./style.module.scss";

import type { NewsItemType } from "@/app/types";

import fetchMedflexData from "@/app/utils/fetchMedflexData";

export const metadata = {
  title: "Биосфера ДВ | Цены",
  description: "Цены для сайта Биосфера ДВ",
};

type MedflexService = {
  id: number | string;
  name: string;
  price?: number | string;
};

interface MedflexPricesResponse {
  data?: {
    services?: MedflexService[];
  };
}

export default async function Price() {
  const prices = await fetchMedflexData<MedflexPricesResponse>(
    `/services/prices/?lpu_id=${process.env.NEXT_PUBLIC_CLINIC_ID}`,
  );
  const services = prices.data?.services ?? [];

  return (
    <main className={styles.main}>
      <div className="container">
        <Breadcrumbs secondLabel="Цены" />
        <h1 className={`${styles.title} visually-hidden`}>
          <span className="text-gradient">Цены</span> и услуги
        </h1>
      </div>
      <ContentPage services={services} />
    </main>
  );
}
