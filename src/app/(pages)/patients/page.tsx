import Breadcrumbs from "@/app/components/Breadcrumbs/Breadcrumbs";
import Image from "next/image";
import fetchData from "@/app/utils/fetchData";
import { notFound } from "next/navigation";
import { SideBarMenu } from "@/app/components";
import styles from "./style.module.scss";

type PageResponse = {
  data: {
    meta_title: string;
    meta_descpiption: string;
    title: string;
    [key: string]: any; // any type for any key
  };
};

const apiUrl = `/api/stranicza-paczientam?` + `populate[documents][populate]=*`;

export async function generateMetadata() {
  const page = await fetchData<PageResponse>(apiUrl);

  return {
    title: `${page?.data?.meta_title}`,
    description: page?.data?.meta_descpiption ?? "",
    openGraph: {
      title: `${page?.data?.meta_title}`,
      description: page?.data?.meta_descpiption ?? "",
    },
  };
}

export default async function Patients() {
  return (
    <main className="container">
      <Breadcrumbs secondLabel={"Программа лояльности"} />

      <div className={styles.page_wrapper}>
        <SideBarMenu />
        <div className={styles.content} id="section">
          <h1>Программа лояльности</h1>
          <p>Здесь пока ничего нет, но скоро будет.</p>
        </div>
      </div>
    </main>
  );
}
