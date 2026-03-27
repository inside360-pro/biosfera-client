import Image from "next/image";
import Link from "next/link";
import fetchData from "@/app/utils/fetchData";
import styles from "./style.module.scss";

const apiUrl = `api/stranicza-uslugi?populate[list][populate]=*`;

type ServicesResponse = {
  data?: {
    list?: ServicesItem[];
  };
};

type ServicesItem = {
  title?: string;
  slug?: string;
  image?: { url: string } | null;
  order?: number;
};

export default async function Services({ className }: { className?: string }) {
  const response = await fetchData<ServicesResponse>(apiUrl);
  const services = response?.data?.list ?? [];

  return (
    <section className={`${styles.services} ${className}`} id="services">
      <div className="container">
        <div className={styles.services_wrapper}>
          <div className={styles.services__header}>
            <h2 className={styles.services__title}>
              <span className="text-gradient">Медицинские услуги,</span> которые
              соответствуют вашим потребностям
            </h2>
            <p>
              Мы сосредоточены на результатах и вашем комфорте, предоставляя
              широкий спектр медицинских услуг, основанных на&nbsp;передовых
              технологиях
            </p>
          </div>

          <ul className={styles.services_list}>
            {services &&
              services.length > 0 &&
              services
                .sort((a, b) => (a.order || 0) - (b.order || 0))
                .map((item) => (
                  <li key={item.title} className={styles.services_item}>
                    <Link
                      className={styles.services_item_link}
                      href={`${item.slug}`}
                    >
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
                        src={
                          item.image?.url
                            ? `${process.env.NEXT_PUBLIC_API_SERVER}${item.image?.url}`
                            : "/placeholder1.svg"
                        }
                        alt={item.title || ""}
                        width={337}
                        height={347}
                      />
                      <h3 className={styles.services_item_title}>
                        {item.title}
                      </h3>
                    </Link>
                  </li>
                ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
