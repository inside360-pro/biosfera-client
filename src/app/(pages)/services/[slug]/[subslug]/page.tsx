import { Breadcrumbs } from "@/app/components";
import fetchData from "@/app/utils/fetchData";
import ContentPage from "./ContentPage";
import { notFound } from "next/navigation";

type ServicesMetadata = {
  data: {
    meta_title: string;
    meta_description: string;
    hero_image: string;
  }[];
};

type ServicesPageResponse = {
  data?: Array<Record<string, unknown>> | null;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; subslug: string }>;
}) {
  const { subslug } = await params;
  const page = (await fetchData(
    `/api/shablon-pod-uslugas?filters[slug][$eq]=${encodeURIComponent(subslug)}`,
  )) as ServicesMetadata;
  return {
    title: `Биосфера ДВ - ${page?.data?.[0]?.meta_title}`,
    description: page?.data?.[0]?.meta_description,
    openGraph: {
      title: "Услуги",
      description: "Услуги",
      image: page?.data?.[0]?.hero_image,
    },
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ slug: string; subslug: string }>;
}) {
  const { slug, subslug } = await params;

  const url =
    `/api/shablon-pod-uslugas?filters[slug][$eq]=${encodeURIComponent(subslug)}` +
    `&populate[prices][populate]=*` +
    `&populate[section][populate]=*` +
    `&populate[how][populate]=*` +
    `&populate[faq][populate]=*` +
    `&populate[seo_block][populate]=*` +
    `&populate[hero_background][populate]=*`;

  const page = await fetchData<ServicesPageResponse>(url);

  if (!page?.data?.[0]) {
    return notFound();
  }

  const fourthLabel =
    (typeof (page.data[0] as any)?.meta_title === "string" &&
      (page.data[0] as any)?.meta_title) ||
    (typeof (page.data[0] as any)?.hero_title === "string" &&
      (page.data[0] as any)?.hero_title) ||
    undefined;

  return (
    <main>
      <div className="container">
        <Breadcrumbs
          secondLink="/services"
          secondLabel="Услуги"
          thirdLink={`/services/${encodeURIComponent(slug)}`}
          thirdLabel="Терапия"
          fourthLabel={fourthLabel}
        />
      </div>
      <ContentPage data={page} />
    </main>
  );
}
