'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { PortfolioHolding, Asset, NewsItem } from '@/lib/types';
import { ALL_ASSETS, DEFAULT_PORTFOLIO_IDS, getAssetById } from '@/lib/assets';
import Portfolio from '@/components/Portfolio';
import NewsFeed from '@/components/NewsFeed';
import InvestorEvents from '@/components/InvestorEvents';

// Rank-based weights: top asset gets most, all differ, none below 10%.
// Formula: weight_i = 10 + extra * (N-1-rank) / triangularNumber(N-1)
// where extra = 100 - N*10
function buildHoldings(assetIds: string[]): PortfolioHolding[] {
  const assets = assetIds
    .map((id) => getAssetById(id))
    .filter((a): a is Asset => Boolean(a));
  const n = assets.length;
  if (n === 0) return [];
  if (n === 1) return [{ ...assets[0], weight: 100 }];
  const extra = 100 - n * 10;
  const triangular = (n * (n - 1)) / 2;
  return assets.map((a, rank) => ({
    ...a,
    weight: 10 + (extra * (n - 1 - rank)) / triangular,
  }));
}

export default function Home() {
  const [portfolioIds, setPortfolioIds] = useState<string[]>(DEFAULT_PORTFOLIO_IDS);
  const [disclaimerOpen, setDisclaimerOpen] = useState(false);
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
    <div className="h-screen flex flex-col overflow-hidden" style={{ backgroundColor: '#101112' }}>
      {/* Legal Disclaimer Modal */}
      {disclaimerOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
          onClick={() => setDisclaimerOpen(false)}
        >
          <div
            className="relative w-full max-w-lg rounded-2xl p-8"
            style={{ backgroundColor: '#1A1B1C', border: '1px solid #2A2B2C' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setDisclaimerOpen(false)}
              className="absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center transition-opacity hover:opacity-70"
              style={{ backgroundColor: '#2A2B2C', color: '#CFCFD0' }}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 2L8 8M8 2L2 8" stroke="#CFCFD0" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            <h2 className="text-white font-bold text-lg mb-1">Legal Disclaimer</h2>
            <p className="text-xs mb-5" style={{ color: '#404141' }}>Please read before using Scalable Terminal</p>

            <div className="space-y-4 text-sm leading-relaxed" style={{ color: '#B5BAD7' }}>
              <p>
                Scalable Terminal is an information aggregation tool. All content displayed — including
                news articles, market data, portfolio values, daily price changes, and corporate events —
                is sourced from third-party providers and presented solely for informational purposes.
              </p>
              <p>
                Nothing on this platform constitutes investment advice, a recommendation to buy or sell
                any financial instrument, or an offer or solicitation to participate in any investment
                strategy. The data shown may be delayed, incomplete, or inaccurate, and should not be
                relied upon for making financial decisions.
              </p>
              <p>
                Investing in financial markets involves risk, including the possible loss of the principal
                amount invested. Past performance of any asset, index, or strategy is not a guarantee or
                reliable indicator of future results. The value of investments can go down as well as up.
              </p>
              <p>
                Before making any investment decision, you should seek independent financial advice from a
                qualified professional and consider whether any investment is appropriate for your personal
                circumstances, financial situation, and objectives.
              </p>
              <p style={{ color: '#404141' }}>
                Scalable Capital GmbH is regulated by BaFin (Bundesanstalt für Finanzdienstleistungsaufsicht).
                This tool is a proof-of-concept prototype and does not represent a live or regulated product.
              </p>
            </div>

            <button
              onClick={() => setDisclaimerOpen(false)}
              className="mt-6 w-full py-2.5 rounded-xl text-sm font-semibold transition-opacity hover:opacity-80"
              style={{ backgroundColor: '#2A2B2C', color: '#CFCFD0' }}
            >
              I understand
            </button>
          </div>
        </div>
      )}

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
            <span className="font-bold text-white text-sm">Scalable Terminal</span>
            <span className="text-xs block" style={{ color: '#404141' }}>
              News, events, and portfolio data in one place
            </span>
          </div>
        </div>

        <button
          onClick={() => setDisclaimerOpen(true)}
          className="text-xs px-3 py-1.5 rounded-full font-medium transition-opacity hover:opacity-80"
          style={{ backgroundColor: '#F7988015', color: '#F79880', border: '1px solid #F7988030' }}
        >
          Legal Disclaimer
        </button>
      </header>

      {/* Intro banner */}
      <div
        className="px-6 py-3 text-xs"
        style={{ backgroundColor: '#ABB6FF10', borderBottom: '1px solid #ABB6FF20', color: '#B5BAD7' }}
      >
        Live news and shareholder events filtered to your holdings. Adjust your portfolio on the left to change what you see.{' '}
        <span style={{ color: '#404141' }}>For information only — not investment advice.</span>
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

        {/* Investor Events panel */}
        <aside
          className="w-72 flex-shrink-0 p-5 overflow-y-auto"
          style={{ borderLeft: '1px solid #1A1B1C' }}
        >
          <InvestorEvents holdings={holdings} />
        </aside>
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
