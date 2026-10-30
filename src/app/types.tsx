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

export interface ArticleItemType {
  id: number;
  documentId: string;
  title?: string;
  slug: string;
  label?: string;
  image?: { url?: string };
  publishedAt?: string;
  content?: string[];
  cover?: { url?: string };
  poster?: { url?: string };
  Seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
  vrachi?: {
    name?: string;
    slug?: string;
    experience?: string;
    specialization?: string;
    small_photo?: { url?: string };
  };
}
