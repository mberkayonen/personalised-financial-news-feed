import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { PortfolioHolding, NewsItem } from '@/lib/types';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

interface RawArticle {
  title: string;
  description: string | null;
  url: string;
  source: { name: string };
  publishedAt: string;
}

async function fetchNewsForQuery(query: string): Promise<RawArticle[]> {
  const url = new URL('https://newsapi.org/v2/everything');
  url.searchParams.set('q', query);
  url.searchParams.set('language', 'en');
  url.searchParams.set('sortBy', 'publishedAt');
  url.searchParams.set('pageSize', '3');
  url.searchParams.set('apiKey', process.env.NEWS_API_KEY ?? '');

  try {
    const res = await fetch(url.toString(), { next: { revalidate: 1800 } });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.articles ?? []).filter(
      (a: RawArticle) => a.url && a.title && !a.title.includes('[Removed]')
    );
  } catch {
    return [];
  }
}

function formatArticleList(articles: RawArticle[]): string {
  if (articles.length === 0) return '  (no recent articles found)';
  return articles
    .map(
      (a) =>
        `  - TITLE: "${a.title}" | SOURCE: ${a.source?.name ?? 'Unknown'} | URL: ${a.url} | DATE: ${a.publishedAt}`
    )
    .join('\n');
}

export async function POST(req: NextRequest) {
  try {
    const { holdings }: { holdings: PortfolioHolding[] } = await req.json();

    if (!holdings || holdings.length === 0) {
      return NextResponse.json({ items: [] });
    }

    // Fetch news in parallel for all assets + macro
    const assetFetches = holdings.map((h) =>
      fetchNewsForQuery(h.searchQuery).then((articles) => ({ holding: h, articles }))
    );
    const macroFetch = fetchNewsForQuery(
      'global financial markets economy stocks interest rates'
    ).then((articles) => ({ holding: null, articles }));

    const results = await Promise.all([...assetFetches, macroFetch]);

    // Build the articles context block for Claude
    const articlesContext = results
      .map(({ holding, articles }) => {
        const label = holding
          ? `### ${holding.name} (${holding.ticker}) — ${holding.weight.toFixed(1)}% of portfolio`
          : `### MACRO / GLOBAL MARKET NEWS`;
        return `${label}\n${formatArticleList(articles)}`;
      })
      .join('\n\n');

    const portfolioSummary = holdings
      .map((h) => `- ${h.name} (${h.ticker}, ${h.type}): ${h.weight.toFixed(1)}%`)
      .join('\n');

    const prompt = `You are a financial news curator for Scalable Capital, a retail investment app.

## User Portfolio
${portfolioSummary}

## Recent Articles Retrieved
${articlesContext}

## Your Task
Return a single JSON object with two fields: "executiveSummary" and "items".

### executiveSummary
Write 3–4 sentences summarising what has happened across the user's portfolio holdings based on the articles above.
Rules:
- Factual and neutral — describe what occurred, not what it means for the investor
- Cover the most significant developments across holdings, weighted by portfolio size
- No investment advice, no buy/sell signals, no forecasts, no value judgements
- Plain English, no jargon
- Do not use phrases like "you should", "consider", "opportunity", "risk to your portfolio"

### items
A JSON array of personalised news cards. Requirements:
- Use ONLY the articles listed above — do not fabricate URLs or sources
- Include 2 items per asset (pick the most relevant articles)
- Include 2–3 macro/market items from the macro section
- Order items by importance: highest portfolio weight assets first, macro items interspersed naturally
- Write summaries in plain English for a retail investor — no jargon
- Each relevanceTag must specifically mention the asset name and portfolio weight percentage
- Do NOT provide investment advice or buy/sell recommendations
- If no articles were found for an asset, skip that asset

Return ONLY valid JSON, no other text:
{
  "executiveSummary": "3-4 sentence neutral summary of what happened across holdings.",
  "items": [
    {
      "id": "unique_string",
      "headline": "Concise headline, max 12 words",
      "summary": "Two sentences. Plain language. No jargon. Accessible to a first-time investor.",
      "sourceUrl": "https://exact-url-from-articles-above",
      "sourceName": "Publication name",
      "relevanceTag": "One sentence explaining why user sees this item",
      "assetId": "TICKER or macro",
      "sentiment": "positive|negative|neutral",
      "publishedAt": "ISO 8601 date string from article"
    }
  ]
}`;

    const message = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 3000,
      messages: [{ role: 'user', content: prompt }],
    });

    const content = message.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected Claude response type');
    }

    // Extract JSON object from response
    const jsonMatch = content.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON object found in Claude response');
    }

    const parsed = JSON.parse(jsonMatch[0]);
    const items: NewsItem[] = parsed.items ?? [];
    const executiveSummary: string = parsed.executiveSummary ?? '';

    return NextResponse.json({ items, executiveSummary });
  } catch (err) {
    console.error('[/api/feed] Error:', err);
    return NextResponse.json(
      { items: [], error: 'Failed to generate feed. Please try again.' },
      { status: 500 }
    );
  }
}
