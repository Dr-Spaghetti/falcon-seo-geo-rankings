export type JobStatus =
  | "queued"
  | "detecting"
  | "crawling"
  | "complete"
  | "failed";

export type PageType =
  | "home"
  | "post"
  | "page"
  | "category"
  | "tag"
  | "author"
  | "archive"
  | "other";

export interface ImageInfo {
  src: string;
  alt: string;
}

export interface LinkInfo {
  href: string;
  text: string;
}

export interface PageRecord {
  url: string;
  canonical: string | null;
  pageType: PageType;
  status: number;
  title: string | null;
  metaDescription: string | null;
  h1: string | null;
  headings: { level: number; text: string }[];
  mainContent: string;
  wordCount: number;
  internalLinks: LinkInfo[];
  externalLinks: LinkInfo[];
  images: ImageInfo[];
  robots: string | null;
  schemaPresent: boolean;
  publishedAt: string | null;
  modifiedAt: string | null;
  crawledAt: string;
  error?: string;
}

export interface Job {
  id: string;
  url: string;
  siteKey: string;
  status: JobStatus;
  createdAt: string;
  updatedAt: string;
  progress: {
    crawled: number;
    queued: number;
    maxPages: number;
  };
  error?: string;
  errorCode?: string;
  wpSignals?: string[];
  pages: PageRecord[];
}

export const DEFAULT_MAX_PAGES = 50;
export const DEFAULT_DELAY_MS = 400;
