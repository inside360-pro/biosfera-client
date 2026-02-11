"use client";
import { useEffect, useState, useRef } from "react";

import styles from "./style.module.css";

/**
 * TODO:
 * - Добавить children для элемента
 */

/**
 * @param string element - html тег, который будет анимирован
 * @param string animationName - имя анимации (fadeUp, fadeDown, fadeLeft, fadeRight)
 * @param number animationDelay - задержка анимации (ms) 1000 = 1s
 * @param string className - добавить класс для элемента
 * @returns html тег с анимацией
 */

const AnimateElement = ({
  element="div",
  animationName = "fadeUp",
  animationDelay = 20,
  className = "",
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimationStarted, setIsAnimationStarted] = useState(false);
  const elementRef = useRef(null);

  const animationClassMap = {
    fadeUp: styles.fadeUp,
    fadeRight: styles.fadeRight,
    fadeLeft: styles.fadeLeft,
    fadeDown: styles.fadeDown,
  };

  const resolvedAnimationClass =
    typeof animationName === "string"
      ? animationClassMap[animationName] ?? animationName
      : "";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);

          // Применяем задержку анимации
          if (animationDelay > 0) {
            setTimeout(() => {
              setIsAnimationStarted(true);
              elementRef.current?.classList.add("active");
            }, animationDelay);
          } else {
            setIsAnimationStarted(true);
            elementRef.current?.classList.add("active");
          }
        }
      },
      { threshold: 0.2 },
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => observer.disconnect();
  }, [isVisible, animationDelay]);

  const Tag = element;

  return (
    <Tag
      ref={elementRef}
      className={`${className} ${resolvedAnimationClass} ${isAnimationStarted ? styles.active : ""}`}
      style={{
        "--animation-delay": `${animationDelay}ms`,
      }}
    >
      {children}
    </Tag>
  );
};

export default AnimateElement;
