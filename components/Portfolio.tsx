'use client';

import { PortfolioHolding, Asset } from '@/lib/types';
import { TYPE_COLORS, TYPE_LABELS, PORTFOLIO_TOTAL_EUR } from '@/lib/assets';

interface PortfolioProps {
  holdings: PortfolioHolding[];
  availableToAdd: Asset[];
  onAdd: (asset: Asset) => void;
  onRemove: (assetId: string) => void;
  loading: boolean;
}

export default function Portfolio({
  holdings,
  availableToAdd,
  onAdd,
  onRemove,
  loading,
}: PortfolioProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-white font-bold text-lg">Alex&apos;s Portfolio</h2>
        <p className="text-xs mt-0.5" style={{ color: '#404141' }}>
          {holdings.length} asset{holdings.length !== 1 ? 's' : ''} · Equal weighting
        </p>
      </div>

      {/* Holdings list */}
      <div className="flex-1 overflow-y-auto mb-6 space-y-2">
        {holdings.map((holding) => {
          const color = TYPE_COLORS[holding.type];
          const eurValue = (PORTFOLIO_TOTAL_EUR * holding.weight) / 100;
          const isPositive = holding.dailyChangePct >= 0;
          const changeColor = isPositive ? '#6BDBCB' : '#F79880';
          return (
            <div
              key={holding.id}
              className="rounded-xl p-3 group transition-all duration-200"
              style={{ backgroundColor: '#1A1B1C', border: '1px solid #2A2B2C' }}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-white font-semibold text-sm truncate">
                      {holding.name}
                    </span>
                    <span
                      className="text-xs px-1.5 py-0.5 rounded font-medium flex-shrink-0"
                      style={{ backgroundColor: `${color}20`, color }}
                    >
                      {TYPE_LABELS[holding.type]}
                    </span>
                  </div>
                  <span className="text-xs" style={{ color: '#404141' }}>
                    {holding.ticker}
                  </span>
                </div>
                <button
                  onClick={() => onRemove(holding.id)}
                  disabled={loading || holdings.length <= 1}
                  className="ml-2 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150 disabled:cursor-not-allowed disabled:opacity-20"
                  style={{ backgroundColor: '#2A2B2C', color: '#F79880' }}
                  title="Remove from portfolio"
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path
                      d="M2 2L8 8M8 2L2 8"
                      stroke="#F79880"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              {/* EUR value + daily change */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-semibold text-sm tabular-nums">
                  €{eurValue.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </span>
                <span className="text-xs font-semibold tabular-nums" style={{ color: changeColor }}>
                  {isPositive ? '+' : ''}{holding.dailyChangePct.toFixed(1)}% today
                </span>
              </div>

              {/* Weight bar */}
              <div className="flex items-center gap-2">
                <div
                  className="flex-1 h-1.5 rounded-full overflow-hidden"
                  style={{ backgroundColor: '#2A2B2C' }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${holding.weight}%`,
                      backgroundColor: color,
                    }}
                  />
                </div>
                <span
                  className="text-xs font-semibold flex-shrink-0 tabular-nums"
                  style={{ color, minWidth: '38px', textAlign: 'right' }}
                >
                  {holding.weight.toFixed(1)}%
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add assets section */}
      {availableToAdd.length > 0 && (
        <div>
          <p className="text-xs font-semibold mb-2" style={{ color: '#404141' }}>
            ADD TO PORTFOLIO
          </p>
          <div className="flex flex-wrap gap-1.5">
            {availableToAdd.map((asset) => {
              const color = TYPE_COLORS[asset.type];
              return (
                <button
                  key={asset.id}
                  onClick={() => onAdd(asset)}
                  disabled={loading}
                  className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-full font-medium transition-all duration-150 hover:opacity-90 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: `${color}15`,
                    color,
                    border: `1px solid ${color}30`,
                  }}
                >
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path
                      d="M4 1V7M1 4H7"
                      stroke={color}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  {asset.ticker}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {availableToAdd.length === 0 && (
        <p className="text-xs" style={{ color: '#404141' }}>
          All available assets are in your portfolio.
        </p>
      )}
    </div>
  );
}
