'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { PortfolioHolding, Asset, NewsItem } from '@/lib/types';
import { ALL_ASSETS, DEFAULT_PORTFOLIO_IDS, getAssetById } from '@/lib/assets';
import Portfolio from '@/components/Portfolio';
import NewsFeed from '@/components/NewsFeed';

function buildHoldings(assetIds: string[]): PortfolioHolding[] {
  const weight = assetIds.length > 0 ? 100 / assetIds.length : 0;
  return assetIds
    .map((id) => getAssetById(id))
    .filter((a): a is Asset => Boolean(a))
    .map((a) => ({ ...a, weight }));
}

export default function Home() {
  const [portfolioIds, setPortfolioIds] = useState<string[]>(DEFAULT_PORTFOLIO_IDS);
  const [feedItems, setFeedItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [feedError, setFeedError] = useState<string | undefined>();
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const holdings = buildHoldings(portfolioIds);
  const availableToAdd = ALL_ASSETS.filter((a) => !portfolioIds.includes(a.id));

  const fetchFeed = useCallback(async (currentHoldings: PortfolioHolding[]) => {
    setLoading(true);
    setFeedError(undefined);
    try {
      const res = await fetch('/api/feed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ holdings: currentHoldings }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setFeedError(data.error ?? 'Something went wrong. Please try again.');
      } else {
        setFeedItems(data.items ?? []);
      }
    } catch {
      setFeedError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounced feed refresh on portfolio change
  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      fetchFeed(holdings);
    }, 400);
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [portfolioIds]);

  const handleAdd = (asset: Asset) => {
    setPortfolioIds((prev) => [...prev, asset.id]);
  };

  const handleRemove = (assetId: string) => {
    setPortfolioIds((prev) => prev.filter((id) => id !== assetId));
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#101112' }}>
      {/* Header */}
      <header
        className="flex items-center justify-between px-6 py-4 border-b"
        style={{ borderColor: '#1A1B1C' }}
      >
        <div className="flex items-center gap-3">
          {/* Scalable S logo */}
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect width="28" height="28" rx="6" fill="#6BDBCB" />
            <path
              d="M19 9.5C19 9.5 17.5 8 14 8C10.5 8 8 10 8 12.5C8 15 10 16 14 16.5C18 17 20 18 20 20.5C20 22.5 17.5 24 14 24C10.5 24 8.5 22 8.5 22"
              stroke="#101112"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <div>
            <span className="font-bold text-white text-sm">Scalable Capital</span>
            <span className="text-xs block" style={{ color: '#404141' }}>
              Personalised Investment Feed · POC
            </span>
          </div>
        </div>

        <div
          className="text-xs px-3 py-1.5 rounded-full font-medium"
          style={{ backgroundColor: '#6BDBCB20', color: '#6BDBCB', border: '1px solid #6BDBCB30' }}
        >
          Concept by Berkay Onen
        </div>
      </header>

      {/* Intro banner */}
      <div
        className="px-6 py-3 text-xs"
        style={{ backgroundColor: '#ABB6FF10', borderBottom: '1px solid #ABB6FF20', color: '#B5BAD7' }}
      >
        <strong style={{ color: '#ABB6FF' }}>How it works:</strong> This feed is personalised to
        Alex&apos;s portfolio. Add or remove assets on the left — weights recalculate in real time
        and the feed updates to reflect what matters most to you.{' '}
        <span style={{ color: '#404141' }}>
          Powered by Claude AI + live financial news.
        </span>
      </div>

      {/* Main layout */}
      <main className="flex flex-1 overflow-hidden">
        {/* Portfolio panel */}
        <aside
          className="w-72 flex-shrink-0 p-5 overflow-y-auto"
          style={{ borderRight: '1px solid #1A1B1C' }}
        >
          <Portfolio
            holdings={holdings}
            availableToAdd={availableToAdd}
            onAdd={handleAdd}
            onRemove={handleRemove}
            loading={loading}
          />
        </aside>

        {/* Feed panel */}
        <section className="flex-1 p-5 overflow-y-auto">
          <NewsFeed
            items={feedItems}
            loading={loading}
            holdings={holdings}
            error={feedError}
          />
        </section>
      </main>

      {/* Footer disclaimer */}
      <footer
        className="px-6 py-3 text-xs text-center"
        style={{ borderTop: '1px solid #1A1B1C', color: '#404141' }}
      >
        This is a proof-of-concept demo. News summaries are for informational purposes only and do
        not constitute investment advice. Past performance is not indicative of future results.
      </footer>
    </div>
  );
}
