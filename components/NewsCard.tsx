'use client';

import { NewsItem } from '@/lib/types';
import { TYPE_COLORS } from '@/lib/assets';
import { PortfolioHolding } from '@/lib/types';

interface NewsCardProps {
  item: NewsItem;
  holdings: PortfolioHolding[];
}

const SENTIMENT_BORDER: Record<string, string> = {
  positive: '#6BDBCB',  // Emerald
  negative: '#F79880',  // Blush
  neutral: '#404141',   // Woodsmoke-80
};

const SENTIMENT_LABEL: Record<string, string> = {
  positive: '↑',
  negative: '↓',
  neutral: '→',
};

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return '';
  }
}

export default function NewsCard({ item, holdings }: NewsCardProps) {
  const holding = holdings.find((h) => h.id === item.assetId);
  const typeColor = holding ? TYPE_COLORS[holding.type] : '#CFCFD0';
  const borderColor = SENTIMENT_BORDER[item.sentiment] ?? SENTIMENT_BORDER.neutral;
  const sentimentIcon = SENTIMENT_LABEL[item.sentiment] ?? '→';

  return (
    <div
      className="rounded-xl p-4 transition-all duration-300"
      style={{
        backgroundColor: '#1A1B1C',
        borderLeft: `3px solid ${borderColor}`,
        border: `1px solid #2A2B2C`,
        borderLeftWidth: '3px',
        borderLeftColor: borderColor,
      }}
    >
      {/* Asset tag + sentiment + date */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {item.assetId === 'macro' ? (
            <span
              className="text-xs font-bold px-2 py-0.5 rounded-full"
              style={{ backgroundColor: '#2A2B2C', color: '#CFCFD0' }}
            >
              🌍 Market
            </span>
          ) : (
            <span
              className="text-xs font-bold px-2 py-0.5 rounded-full"
              style={{ backgroundColor: `${typeColor}20`, color: typeColor }}
            >
              {item.assetId}
            </span>
          )}
        </div>
        {item.publishedAt && (
          <span className="text-xs" style={{ color: '#404141' }}>
            {formatDate(item.publishedAt)}
          </span>
        )}
      </div>

      {/* Headline */}
      <h3 className="font-bold text-white text-sm leading-snug mb-1.5">
        {item.headline}
      </h3>

      {/* Summary */}
      <p className="text-sm leading-relaxed mb-3" style={{ color: '#CFCFD0' }}>
        {item.summary}
      </p>

      {/* Relevance tag */}
      <div
        className="flex items-start gap-1.5 text-xs rounded-lg px-3 py-2 mb-3"
        style={{ backgroundColor: '#101112', color: '#B5BAD7' }}
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          className="mt-0.5 flex-shrink-0"
        >
          <circle cx="6" cy="6" r="5.5" stroke="#B5BAD7" />
          <rect x="5.5" y="5" width="1" height="4" fill="#B5BAD7" />
          <circle cx="6" cy="3.5" r="0.75" fill="#B5BAD7" />
        </svg>
        <span>{item.relevanceTag}</span>
      </div>

      {/* Source link */}
      <a
        href={item.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-xs font-medium transition-opacity hover:opacity-80"
        style={{ color: '#6BDBCB' }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M2 6H10M7 3L10 6L7 9"
            stroke="#6BDBCB"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {item.sourceName}
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="opacity-60">
          <path
            d="M2 8L8 2M8 2H4M8 2V6"
            stroke="#6BDBCB"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </div>
  );
}
