import Breadcrumbs from "@/app/components/Breadcrumbs/Breadcrumbs";

import styles from "./style.module.scss";
import fetchData from "@/app/utils/fetchData";
import { notFound } from "next/navigation";
import Image from "next/image";
import ContentRenderer, {
  type ContentItem,
} from "@/app/components/ContentRenderer/ContentRenderer";
import PromoButton from "./button";

type PromoItem = {
  id: number;
  title?: string | null;
  description?: ContentItem[] | null;
  image?: { url?: string | null } | null;
  okonchaniye?: string | null;
};

type PromoPageResponse = {
  data?: PromoItem[] | null;
};

export const metadata = {
  title: "Биосфера ДВ | Акции ",
  description: "Акции для сайта Биосфера ДВ",
};

const apiUrl = "/api/akcziis?populate=*";

export default async function Promo() {
  let page: PromoPageResponse | null = null;
  const domain = process.env.NEXT_PUBLIC_API_SERVER ?? "";
  try {
    page = await fetchData<PromoPageResponse>(apiUrl);
  } catch (error) {
    console.error("Ошибка при загрузке данных:", error);
  }

  if (!page?.data) {
    return notFound();
  }

  return (
    <div className="container">
      <Breadcrumbs secondLabel="Акции " />
      <h1 className={styles.promo_title}>
        <span className="text-gradient">Акции</span> и специальные предложения{" "}
      </h1>
      <p className={styles.promo_description}>
        Мы регулярно предлагаем специальные условия на медицинские услуги, чтобы
        качественная помощь была доступнее и удобнее для наших пациентов.
      </p>

      <ul className={styles.promo_list}>
        {page.data.map((item) => (
          <li key={item.id} className={styles.promo_item}>
            <div className={styles.promo_item_content}>
              <div className={styles.promo_image}>
                <Image
                  className="dsv-image"
                  src={
                    item.image?.url
                      ? `${domain}${item.image.url}`
                      : "/placeholder1.svg"
                  }
                  alt="News"
                  width={288}
                  height={180}
                />
              </div>
              <h3 className={`${styles.promo_item_title} text-gradient`}>
                {item.title}
              </h3>
              <ContentRenderer content={item.description ?? []} />
            </div>

            <PromoButton />
          </li>
        ))}
      </ul>
    </div>
  );
}
