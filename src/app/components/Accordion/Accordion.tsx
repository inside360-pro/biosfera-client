"use client";

import type { ReactNode } from "react";
import { useEffect, useId, useRef, useState } from "react";
import styles from "./style.module.scss";

type AccordionItem = {
  title: string;
  content: ReactNode;
};

type AccordionProps = {
  list?: AccordionItem[] | null;
};

export default function Accordion({ list }: AccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const contentRefs = useRef<Array<HTMLDivElement | null>>([]);
  const accordionId = useId();

  useEffect(() => {
    const updateHeights = () => {
      contentRefs.current.forEach((el, index) => {
        if (!el) return;
        el.style.maxHeight =
          activeIndex === index
            ? ((el.firstElementChild as HTMLElement | null)?.scrollHeight ??
                el.scrollHeight) + "px"
            : "0px";
      });
    };

    updateHeights();
    window.addEventListener("resize", updateHeights);
    return () => window.removeEventListener("resize", updateHeights);
  }, [activeIndex]);

  return (
    <div className={styles.accordion}>
      <ul className={styles.accordion__list}>
        {list &&
          list.length > 0 &&
          list.map((item, index) => (
            <li
              key={`${item.title}-${index}`}
              className={styles.accordion__item}
            >
              <button
                className={`${styles.accordion__item_button} ${activeIndex === index ? styles.active_button : ""}`}
                type="button"
                aria-expanded={activeIndex === index}
                aria-controls={`${accordionId}-panel-${index}`}
                onClick={() =>
                  setActiveIndex(activeIndex === index ? null : index)
                }
              >
                <span className={styles.accordion__item_title}>
                  {item.title}
                </span>
                <div className={styles.accordion__item_icon}>
                  <svg
                    width="60"
                    height="60"
                    viewBox="0 0 60 60"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-label="Icon"
                    role="img"
                  >
                    <rect
                      width="60"
                      height="60"
                      rx="30"
                      fill="url(#paint0_linear_1_1009)"
                    />
                    <path d="M31 18V42" stroke="white" />
                    <path d="M19 30H43" stroke="white" />
                    <defs>
                      <linearGradient
                        id="paint0_linear_1_1009"
                        x1="0"
                        y1="30"
                        x2="60"
                        y2="30"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#3170B4" />
                        <stop offset="1" stopColor="#5CCCC2" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </button>

              <div
                id={`${accordionId}-panel-${index}`}
                className={`${styles.accordion__item_content} ${activeIndex === index ? styles.isActive : ""}`}
                ref={(el) => {
                  contentRefs.current[index] = el;
                }}
              >
                <div className={styles.accordion__item_content_inner}>
                  {item.content}
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
