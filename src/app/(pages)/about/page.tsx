import { Breadcrumbs } from "@/app/components";
import fetchData from "@/app/utils/fetchData";
import ContentPage from "./ContentPage";
import { notFound } from "next/navigation";

type PageResponse = {
  data: {
    meta_title: string;
    meta_descpiption: string;
    title: string;
    [key: string]: any; // any type for any key
  };
};

const apiUrl =
  `/api/stranicza-o-czentre?` +
  `populate[hero_background][populate]=*` +
  `&populate[faq][populate]=*` +
  `&populate[about_section][populate]=*` +
  `&populate[about_image_l][populate]=*` +
  `&populate[about_image_s][populate]=*` +
  `&populate[licenses][populate]=*` +
  `&populate[gallery][populate]=*`;

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

export default async function About() {
  let page: PageResponse | null = null;

  try {
    page = await fetchData<PageResponse>(apiUrl);
  } catch (error) {
    console.error("Ошибка при загрузке данных:", error);
  }

  if (!page?.data) {
    return notFound();
  }

  return (
    <>
      <div className="container">
        <Breadcrumbs secondLabel="О центре" />
      </div>
      <ContentPage data={page?.data} />
    </>
  );
}
