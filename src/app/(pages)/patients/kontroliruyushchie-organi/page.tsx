import Breadcrumbs from "@/app/components/Breadcrumbs/Breadcrumbs";
import styles from "../style.module.scss";
import fetchData from "@/app/utils/fetchData";
import { notFound } from "next/navigation";
import { SideBarMenu } from "@/app/components";
import Image from "next/image";
import { normalizePhoneForTel } from "@/app/utils/normalizePhoneForTel";

type PageResponse = {
  data: {
    meta_title: string;
    meta_descpiption: string;
    title: string;
    [key: string]: any; // any type for any key
  };
};

interface ControlItem {
  id: string;
  title: string;
  description?: string;
  image?: { url: string };
  address?: string;
  phone?: string;
  email?: string;
  fax?: string;
}

const apiUrl =
  `/api/stranicza-paczientam-kontakty-kontroliruyushhih-organov?` +
  `populate[list][populate]=*`;

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
  let page: PageResponse | null = null;

  try {
    page = await fetchData<PageResponse>(apiUrl);
  } catch (error) {
    console.error("Ошибка при загрузке данных:", error);
  }

  if (!page?.data) {
    return notFound();
  }

  const data = page?.data;

  return (
    <main className="container">
      <Breadcrumbs secondLabel={data?.title ?? "Контролирующие органы"} />

      <div className={styles.page_wrapper}>
        <SideBarMenu />
        <div className={styles.content} id="section">
          <h1 className={styles.content__title}>
            {data?.title ?? "Контролирующие органы"}
          </h1>
          <ul className={styles.list}>
            {data?.list?.map((item: ControlItem) => (
              <li className={styles.control_item} key={item.id}>
                {item.image?.url && (
                  <div className={styles.control_item_image}>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_SERVER}${item.image?.url}`}
                      alt={item.title ?? "Контролирующий орган"}
                      width={110}
                      height={120}
                      className="dsv-image"
                    />
                  </div>
                )}
                <div className={styles.control_item_content}>
                  <h2 className={styles.list_item_title}>
                    {item?.title ?? ""}
                  </h2>
                  <p className={styles.control_item_description}>
                    {item?.description ?? ""}
                  </p>
                  <ul className={styles.control_inner_list}>
                    <li className={styles.control_inner_item}>
                      <Image
                        src={"/icons/pin-icon.svg"}
                        alt="Location"
                        width={24}
                        height={24}
                      />
                      <span className={styles.control_inner_item_value}>
                        {item?.address ?? ""}
                      </span>
                    </li>
                    <li className={styles.control_inner_item}>
                      <Image
                        src={"/icons/phone.svg"}
                        alt="Phone"
                        width={24}
                        height={24}
                      />
                      <a href={normalizePhoneForTel(item?.phone ?? "")}>
                        {item?.phone ?? ""}
                      </a>
                    </li>
                    <li className={styles.control_inner_item}>
                      <Image
                        src={"/icons/email-icon.svg"}
                        alt="Email"
                        width={24}
                        height={24}
                      />
                      <a href={`mailto:${item?.email ?? ""}`}>
                        {item?.email ?? ""}
                      </a>
                    </li>
                    {item?.fax && (
                      <li className={styles.control_inner_item}>
                        <Image
                          src={"/icons/fax-icon.svg"}
                          alt="Fax"
                          width={24}
                          height={24}
                        />
                        <a href={`mailto:${item?.fax ?? ""}`}>
                          {item?.fax ?? ""}
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
