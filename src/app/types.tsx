export interface CostItemType {
  id?: number;
  title?: string;
  price?: string;
  link?: string;
}

export interface SliderItemType {
  id: number;
  content?: [];
  image?: { url?: string }[];
  link?: string;
}

export interface IncludesListType {
  items: IncludesItemType[];
}

export interface IncludesItemType {
  id: number;
  title?: string;
}

export interface NewsItemType {
  id: number;
  documentId: string;
  title?: string;
  description?: string;
  label?: string;
  image?: { url?: string };
  publishedAt?: string;
  content?: string[];
  isRecomended?: boolean;
}
