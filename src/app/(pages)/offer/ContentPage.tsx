"use client";
import { ContentRenderer } from "@/app/components";
import type { PolicyPageData } from "./types";

export default function ContentPage({ data }: { data: PolicyPageData }) {
  return (
    <>{data.data.content && <ContentRenderer content={data.data.content} />}</>
  );
}
