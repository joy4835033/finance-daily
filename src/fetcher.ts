import Parser from 'rss-parser';
import { Article, RSSSource } from './types.js';

const parser = new Parser({
  timeout: 15000,
  headers: {
    'User-Agent': 'Mozilla/5.0 (compatible; NewsBot/1.0)',
  },
});

async function fetchSource(source: RSSSource): Promise<Article[]> {
  try {
    const feed = await parser.parseURL(source.url);
    return (feed.items || []).slice(0, 20).map(item => ({
      title: item.title || '无标题',
      summary: item.contentSnippet || item.content || item.summary || '',
      link: item.link || '',
      publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
      source: source.name,
      tier: source.tier,
    }));
  } catch (err) {
    console.warn(`⚠️  抓取失败 [${source.name}]: ${(err as Error).message}`);
    return [];
  }
}

export async function fetchAllSources(sources: RSSSource[]): Promise<Article[]> {
  const results = await Promise.allSettled(sources.map(s => fetchSource(s)));
  const all: Article[] = [];
  results.forEach((r, i) => {
    if (r.status === 'fulfilled') {
      console.log(`✅ [${sources[i].name}] 获取 ${r.value.length} 条`);
      all.push(...r.value);
    }
  });
  return all;
}
