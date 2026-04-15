export interface Article {
  title:          string;
  link:           string;
  publishedAt:    Date;
  source:         string;
  summary:        string;
  rawDescription: string;
  tier:           1 | 2 | 3;
}

export interface RSSSource {
  name: string;
  url:  string;
  tier: 1 | 2 | 3;
}
