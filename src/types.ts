export interface Article {
  title:          string;
  link:           string;
  publishedAt:    Date;
  source:         string;        // ← 改成 string，不锁死来源名
  summary:        string;
  rawDescription: string;
  tier:           1 | 2 | 3;
}

export interface RSSSource {
  name: string;                  // ← 同上
  url:  string;
  tier: 1 | 2 | 3;
}
