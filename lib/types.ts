export type AssetType = 'stock' | 'etf' | 'crypto' | 'fx' | 'bond';

export interface Asset {
  id: string;
  ticker: string;
  name: string;
  type: AssetType;
  searchQuery: string;
  dailyChangePct: number; // % change vs previous day (mock)
  logoUrl?: string;
}

export interface PortfolioHolding extends Asset {
  weight: number; // percentage, 0–100
}

export type Sentiment = 'positive' | 'negative' | 'neutral';

export interface NewsItem {
  id: string;
  headline: string;
  summary: string;
  sourceUrl: string;
  sourceName: string;
  relevanceTag: string;
  assetId: string; // ticker or 'macro'
  sentiment: Sentiment;
  publishedAt: string;
}

export interface FeedResponse {
  items: NewsItem[];
  executiveSummary?: string;
  error?: string;
}
