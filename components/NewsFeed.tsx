'use client';

import { NewsItem, PortfolioHolding } from '@/lib/types';
import NewsCard from './NewsCard';

interface NewsFeedProps {
  items: NewsItem[];
  loading: boolean;
  holdings: PortfolioHolding[];
  error?: string;
}

function SkeletonCard() {
  return (
    <div
      className="rounded-xl p-4 mb-3 animate-pulse"
      style={{ backgroundColor: '#1A1B1C', border: '1px solid #2A2B2C' }}
    >
      <div className="flex gap-2 mb-3">
        <div className="h-5 w-16 rounded-full" style={{ backgroundColor: '#2A2B2C' }} />
        <div className="h-5 w-20 rounded-full" style={{ backgroundColor: '#2A2B2C' }} />
      </div>
      <div className="h-4 w-3/4 rounded mb-2" style={{ backgroundColor: '#2A2B2C' }} />
      <div className="h-3 w-full rounded mb-1" style={{ backgroundColor: '#2A2B2C' }} />
      <div className="h-3 w-5/6 rounded mb-4" style={{ backgroundColor: '#2A2B2C' }} />
      <div className="h-8 w-full rounded-lg mb-3" style={{ backgroundColor: '#2A2B2C' }} />
      <div className="h-3 w-24 rounded" style={{ backgroundColor: '#2A2B2C' }} />
    </div>
  );
}

export default function NewsFeed({ items, loading, holdings, error }: NewsFeedProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Feed header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-white font-bold text-lg">Your Feed</h2>
          <p className="text-xs mt-0.5" style={{ color: '#404141' }}>
            Personalised to your portfolio weights
          </p>
        </div>
        {loading && (
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full animate-ping"
              style={{ backgroundColor: '#6BDBCB' }}
            />
            <span className="text-xs" style={{ color: '#6BDBCB' }}>
              Updating…
            </span>
          </div>
        )}
      </div>

      {/* Error state */}
      {error && !loading && (
        <div
          className="rounded-xl p-4 mb-3 text-sm"
          style={{ backgroundColor: '#1A1B1C', border: '1px solid #F79880', color: '#F79880' }}
        >
          {error}
        </div>
      )}

      {/* Skeleton loading */}
      {loading && items.length === 0 && (
        <>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </>
      )}

      {/* Feed items with optional loading overlay */}
      {items.length > 0 && (
        <div className={`transition-opacity duration-300 ${loading ? 'opacity-40' : 'opacity-100'}`}>
          {items.map((item) => (
            <NewsCard key={item.id} item={item} holdings={holdings} />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && items.length === 0 && (
        <div
          className="rounded-xl p-8 text-center"
          style={{ backgroundColor: '#1A1B1C', border: '1px solid #2A2B2C' }}
        >
          <p style={{ color: '#404141' }}>Add assets to your portfolio to see your feed.</p>
        </div>
      )}
    </div>
  );
}
