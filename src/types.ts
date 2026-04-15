export interface RSSSource {
  name: string;
  url: string;
  tier: number;
}

export interface Article {
  title: string;
  summary: string;
  link: string;
  publishedAt: Date;
  source: string;
  tier: number;
}
