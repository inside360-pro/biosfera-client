import {
  Hero,
  Services,
  About,
  Gallery,
  Doctors,
  News,
  Owner,
  Map as MapSection,
} from "./sections";

import styles from "./page.module.css";
import fetchData from "./utils/fetchData";
import type { NewsItemType } from "./types";

type GalleryImage = {
  id: number;
  image: { url: string };
};

interface ApiListResponse<T> {
  data?: T[];
}

// тут пока так оставил, потому что нет данных для about

const about_section = [
  {
    title: "Честная медицина",
    description:
      "Мы не увеличиваем чек за счёт ненужных анализов и процедур. Назначения делаются только тогда, когда они действительно обоснованы.",
  },
  {
    title: "Комфорт и уважение",
    description:
      "Мы строим сервис вокруг пациента - чёткая запись, соблюдение времени приёма, спокойная атмосфера для эффективного лечения.",
  },
  {
    title: "Центр здоровья и инноваций",
    description:
      "Мы — медицинский центр, который ставит вашего здоровья и комфорт на первое место. Объединяя высококвалифицированных специалистов с передовыми технологиями, мы предлагаем вам качественное обслуживание. В нашем центре нет стандартных решений — мы работаем для того, чтобы каждый пациент получил необходимое и своевременное лечение.",
  },
  {
    title: "Телемедицина",
    description:
      "Онлайн-консультации, расшифровка анализов и второе мнение врача — без визита в клинику. Получайте ответы без задержен.",
  },
  {
    title: "Современные технологии",
    description:
      "Все диагностические и лечебные процедуры проводятся на оборудовании нового поколения, то гарантирует высокую точность и результативность.",
  },
];
const about_image_l = {
  url: "",
};
const about_image_s = {
  url: "",
};

export default async function Home() {
  const url =
    `/api/shablon-uslugis?filters[slug][$eq]=therapy` +
    `&populate[gallery][populate]=*`;

  const data =
    await fetchData<ApiListResponse<{ gallery?: GalleryImage[] }>>(url);
  const gallery = data?.data?.[0]?.gallery ?? ([] as GalleryImage[]);

  const newsUrl = `/api/novostis?populate=*`;
  const newsData = await fetchData<ApiListResponse<NewsItemType>>(newsUrl);
  const news = newsData?.data ?? ([] as NewsItemType[]);

  return (
    <main className={styles.main}>
      <Hero />
      <Services />
      <About
        data={about_section}
        image_l={about_image_l}
        image_s={about_image_s}
      />
      <Gallery images={gallery} />
      <Owner />
      <Doctors />
      <News data={news} />
      <MapSection />

      {/* <Image
        src="/Item.png"
        alt="VDS"
        width={460}
        height={425}
        className="dsv-image"
        priority
      /> */}

      {/* <p className="text">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id adipisci,
        temporibus nesciunt cumque deleniti, quas eligendi est esse,
        reprehenderit aperiam quasi quo nisi accusantium aspernatur soluta
        doloribus eos nemo molestiae!
      </p>

      <AnimateElement element="p">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id adipisci,
        temporibus nesciunt cumque deleniti, quas eligendi est esse,
        reprehenderit aperiam quasi quo nisi accusantium aspernatur soluta
        doloribus eos nemo molestiae!
      </AnimateElement> */}
    </main>
  );
}
