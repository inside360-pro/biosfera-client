"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AnimateElement, ContentRenderer } from "@/app/components";
import fetchData from "@/app/utils/fetchData";
import type { ContentItem } from "@/app/components/ContentRenderer/ContentRenderer";
import styles from "./style.module.scss";

type OwnerData = {
  name?: string;
  job_title?: string;
  text?: ContentItem[];
  image?: { url?: string | null } | null;
};

type OwnerResponse = { data?: OwnerData };

const apiUrl = `api/sekcziya-glavnyj-vrach?populate=*`;

export default function Owner() {
  const [owner, setOwner] = useState<OwnerData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchOwner = async () => {
      const response = await fetchData<OwnerResponse>(apiUrl);
      setOwner(response?.data ?? null);
    };
    fetchOwner();
  }, []);

  const scrollToForm = () => {
    const formElement = document.getElementById("biosphera-form");
    if (!formElement) {
      router.push("/about#biosphera-form");
      return;
    }

    formElement.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_SERVER ?? "";
  const ownerImageSrc =
    owner?.image?.url != null && owner.image.url !== ""
      ? `${apiBaseUrl}${owner.image.url}`
      : "/placeholder1.svg";

  return (
    <section className={styles.owner}>
      <div className="container">
        <div className={styles.owner_wrapper}>
          <div className={styles.owner__qoutes}>
            <Image
              src="/images/quotes.svg"
              className="dsv-image"
              alt="quotes"
              width={68}
              height={78}
            />
          </div>

          <div className={styles.owner__descriptions}>
            <ContentRenderer content={owner?.text ?? []} />
          </div>

          <AnimateElement animationName="fadeRight" animationDelay={150}>
            <div className={styles.owner__image}>
              <Image
                src={ownerImageSrc}
                className="dsv-image"
                alt="Owner"
                width={439}
                height={439}
              />
            </div>
          </AnimateElement>

          <div className={styles.owner__content}>
            <h3 className={styles.owner__title}>{owner?.name}</h3>
            <p className={styles.owner__position}>{owner?.job_title}</p>
          </div>

          <div className={styles.owner__button}>
            <button
              type="button"
              className={styles.primary_button}
              onClick={scrollToForm}
            >
              Задать вопрос главному врачу
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
