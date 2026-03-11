"use client";

import type { FC } from "react";

interface LoadingTextProps {
  text?: string;
  className?: string;
}

const Spinner = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="14 42">
      <animateTransform attributeName="transform" type="rotate" dur="0.8s" values="0 12 12;360 12 12" repeatCount="indefinite" />
    </circle>
  </svg>
);

const LoadingText: FC<LoadingTextProps> = ({ text = "Отзывы загружаются...", className }) => {
  return (
    <p className={className} style={{ display: "flex", alignItems: "center", gap: "8px", margin: "20px 0" }}>
      <Spinner />
      {text}
    </p>
  );
};

export default LoadingText;
