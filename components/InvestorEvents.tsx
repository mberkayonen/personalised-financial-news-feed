'use client';

import { PortfolioHolding } from '@/lib/types';
import { TYPE_COLORS } from '@/lib/assets';
import {
  InvestorEvent,
  EVENT_TYPE_LABELS,
  EVENT_TYPE_COLORS,
  getEventsForHoldings,
} from '@/lib/events';

interface InvestorEventsProps {
  holdings: PortfolioHolding[];
}

const TODAY = new Date(new Date().toDateString());

function formatRelativeDate(isoDate: string): { label: string; isUpcoming: boolean } {
  const d = new Date(isoDate);
  const diffMs = d.getTime() - TODAY.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return { label: 'Today', isUpcoming: true };
  if (diffDays === 1) return { label: 'Tomorrow', isUpcoming: true };
  if (diffDays === -1) return { label: 'Yesterday', isUpcoming: false };
  if (diffDays > 0 && diffDays <= 30) return { label: `In ${diffDays}d`, isUpcoming: true };
  if (diffDays < 0 && diffDays >= -30) return { label: `${Math.abs(diffDays)}d ago`, isUpcoming: false };

  return {
    label: d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
    isUpcoming: diffDays > 0,
  };
}

function EventCard({ event, holdings }: { event: InvestorEvent; holdings: PortfolioHolding[] }) {
  const holding = holdings.find((h) => h.id === event.assetId);
  const assetColor = holding ? TYPE_COLORS[holding.type] : '#CFCFD0';
  const typeColor = EVENT_TYPE_COLORS[event.type];
  const typeLabel = EVENT_TYPE_LABELS[event.type];
  const { label: relDate, isUpcoming } = formatRelativeDate(event.date);

  return (
    <div
      className="rounded-xl p-3 transition-all duration-200"
      style={{ backgroundColor: '#1A1B1C', border: '1px solid #2A2B2C' }}
    >
      {/* Header row */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <span
            className="text-xs font-bold px-1.5 py-0.5 rounded-full"
            style={{ backgroundColor: `${assetColor}20`, color: assetColor }}
          >
            {event.assetId === 'EURUSD' ? 'EUR/USD' : event.assetId}
          </span>
          <span
            className="text-xs font-medium px-1.5 py-0.5 rounded"
            style={{ backgroundColor: `${typeColor}15`, color: typeColor }}
          >
            {typeLabel}
          </span>
        </div>
        <span
          className="text-xs font-semibold tabular-nums"
          style={{ color: isUpcoming ? '#6BDBCB' : '#404141' }}
        >
          {relDate}
        </span>
      </div>

      {/* Title */}
      <p className="text-white text-sm font-semibold leading-snug mb-1">
        {event.title}
      </p>

      {/* Description */}
      {event.description && (
        <p className="text-xs leading-relaxed" style={{ color: '#B5BAD7' }}>
          {event.description}
        </p>
      )}
    </div>
  );
}

export default function InvestorEvents({ holdings }: InvestorEventsProps) {
  const assetIds = holdings.map((h) => h.id);
  const events = getEventsForHoldings(assetIds);

  const upcoming = events.filter((e) => new Date(e.date) >= TODAY);
  const past = events.filter((e) => new Date(e.date) < TODAY);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-white font-bold text-lg">Investor Events</h2>
        <p className="text-xs mt-0.5" style={{ color: '#404141' }}>
          Earnings, dividends &amp; shareholder comms
        </p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4">
        {/* Upcoming */}
        {upcoming.length > 0 && (
          <div>
            <p className="text-xs font-semibold mb-2 uppercase tracking-wide" style={{ color: '#6BDBCB' }}>
              Upcoming
            </p>
            <div className="space-y-2">
              {upcoming.map((event) => (
                <EventCard key={event.id} event={event} holdings={holdings} />
              ))}
            </div>
          </div>
        )}

        {/* Past */}
        {past.length > 0 && (
          <div>
            <p className="text-xs font-semibold mb-2 uppercase tracking-wide" style={{ color: '#404141' }}>
              Recent
            </p>
            <div className="space-y-2">
              {past.map((event) => (
                <EventCard key={event.id} event={event} holdings={holdings} />
              ))}
            </div>
          </div>
        )}

        {events.length === 0 && (
          <div
            className="rounded-xl p-6 text-center"
            style={{ backgroundColor: '#1A1B1C', border: '1px solid #2A2B2C' }}
          >
            <p className="text-sm" style={{ color: '#404141' }}>
              No events found for your current holdings.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
