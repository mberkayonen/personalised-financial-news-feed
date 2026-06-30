export type EventType =
  | 'earnings'
  | 'dividend'
  | 'agm'
  | 'investor-day'
  | 'press-release'
  | 'report'
  | 'conference'
  | 'rate-decision'
  | 'index-rebalance';

export interface InvestorEvent {
  id: string;
  assetId: string;
  type: EventType;
  title: string;
  date: string; // ISO date (YYYY-MM-DD)
  description?: string;
}

export const EVENT_TYPE_LABELS: Record<EventType, string> = {
  earnings: 'Earnings',
  dividend: 'Dividend',
  agm: 'AGM',
  'investor-day': 'Investor Day',
  'press-release': 'Press Release',
  report: 'Report',
  conference: 'Conference',
  'rate-decision': 'Rate Decision',
  'index-rebalance': 'Rebalance',
};

export const EVENT_TYPE_COLORS: Record<EventType, string> = {
  earnings: '#ABB6FF',
  dividend: '#6BDBCB',
  agm: '#FFC880',
  'investor-day': '#ABB6FF',
  'press-release': '#B5BAD7',
  report: '#A8D0CA',
  conference: '#FFC880',
  'rate-decision': '#F79880',
  'index-rebalance': '#6BDBCB',
};

// All events — dates relative to 2026-06-07 (today)
export const ALL_EVENTS: InvestorEvent[] = [
  // AAPL
  {
    id: 'aapl-earnings-q2-26',
    assetId: 'AAPL',
    type: 'earnings',
    title: 'Q2 FY2026 Earnings Release',
    date: '2026-05-01',
    description: 'Apple reported EPS of $1.65, beating consensus by 4%.',
  },
  {
    id: 'aapl-div-may26',
    assetId: 'AAPL',
    type: 'dividend',
    title: 'Quarterly Dividend Payment',
    date: '2026-05-15',
    description: '$0.25 per share paid to shareholders of record.',
  },
  {
    id: 'aapl-wwdc-26',
    assetId: 'AAPL',
    type: 'conference',
    title: 'WWDC 2026',
    date: '2026-06-09',
    description: 'Worldwide Developers Conference — new OS previews and hardware announcements expected.',
  },
  {
    id: 'aapl-earnings-q3-26',
    assetId: 'AAPL',
    type: 'earnings',
    title: 'Q3 FY2026 Earnings Release',
    date: '2026-07-30',
    description: 'Quarterly results covering April–June 2026.',
  },

  // NVDA
  {
    id: 'nvda-computex-26',
    assetId: 'NVDA',
    type: 'conference',
    title: 'Computex 2026 Keynote',
    date: '2026-06-02',
    description: 'Jensen Huang keynote — next-gen GPU architecture announcement.',
  },
  {
    id: 'nvda-earnings-q1-27',
    assetId: 'NVDA',
    type: 'earnings',
    title: 'Q1 FY2027 Earnings Release',
    date: '2026-05-28',
    description: 'NVIDIA reported record revenue of $44.1B, up 69% YoY.',
  },
  {
    id: 'nvda-div-jun26',
    assetId: 'NVDA',
    type: 'dividend',
    title: 'Quarterly Dividend Payment',
    date: '2026-06-25',
    description: '$0.01 per share dividend.',
  },
  {
    id: 'nvda-earnings-q2-27',
    assetId: 'NVDA',
    type: 'earnings',
    title: 'Q2 FY2027 Earnings Release',
    date: '2026-08-27',
    description: 'Quarterly results covering May–July 2026.',
  },

  // IWDA
  {
    id: 'iwda-rebalance-jun26',
    assetId: 'IWDA',
    type: 'index-rebalance',
    title: 'Semi-Annual Index Rebalance',
    date: '2026-06-20',
    description: 'MSCI World Index semi-annual review — constituent additions and removals.',
  },
  {
    id: 'iwda-dist-jun26',
    assetId: 'IWDA',
    type: 'dividend',
    title: 'Semi-Annual Distribution',
    date: '2026-06-30',
    description: 'iShares MSCI World ETF income distribution to unitholders.',
  },

  // BTC
  {
    id: 'btc-halving-2028',
    assetId: 'BTC',
    type: 'report',
    title: 'Next Halving Estimate',
    date: '2028-04-15',
    description: 'Bitcoin block reward halving — supply issuance drops from 3.125 to 1.5625 BTC per block.',
  },
  {
    id: 'btc-etf-report-jun26',
    assetId: 'BTC',
    type: 'report',
    title: 'Spot ETF Monthly Holdings Report',
    date: '2026-06-10',
    description: 'BlackRock iShares Bitcoin ETF (IBIT) publishes monthly AUM and flows disclosure.',
  },

  // EURUSD
  {
    id: 'ecb-rate-jun26',
    assetId: 'EURUSD',
    type: 'rate-decision',
    title: 'ECB Monetary Policy Decision',
    date: '2026-06-05',
    description: 'ECB held rates steady at 2.25%. Press conference followed at 14:45 CET.',
  },
  {
    id: 'fed-fomc-jun26',
    assetId: 'EURUSD',
    type: 'rate-decision',
    title: 'Fed FOMC Rate Decision',
    date: '2026-06-18',
    description: 'Federal Reserve interest rate decision and updated dot plot projections.',
  },
  {
    id: 'ecb-rate-jul26',
    assetId: 'EURUSD',
    type: 'rate-decision',
    title: 'ECB Monetary Policy Decision',
    date: '2026-07-24',
    description: 'Next ECB governing council meeting on monetary policy.',
  },

  // SAP
  {
    id: 'sap-earnings-q2-26',
    assetId: 'SAP',
    type: 'earnings',
    title: 'Q2 2026 Earnings Release',
    date: '2026-07-22',
    description: 'SAP quarterly results — cloud revenue growth and full-year guidance update.',
  },
  {
    id: 'sap-investor-day-26',
    assetId: 'SAP',
    type: 'investor-day',
    title: 'SAP Sapphire Now 2026',
    date: '2026-06-16',
    description: 'Annual enterprise conference — AI strategy and product roadmap presentations.',
  },

  // VOW3
  {
    id: 'vow3-agm-26',
    assetId: 'VOW3',
    type: 'agm',
    title: 'Annual General Meeting 2026',
    date: '2026-05-08',
    description: 'Shareholders voted on dividend of €4.50 per ordinary share.',
  },
  {
    id: 'vow3-earnings-h1-26',
    assetId: 'VOW3',
    type: 'earnings',
    title: 'H1 2026 Results',
    date: '2026-07-30',
    description: 'Volkswagen Group half-year financial results including EV delivery figures.',
  },

  // SPY
  {
    id: 'spy-dist-jun26',
    assetId: 'SPY',
    type: 'dividend',
    title: 'Quarterly Distribution',
    date: '2026-06-27',
    description: 'SPDR S&P 500 ETF quarterly income distribution.',
  },
  {
    id: 'spy-rebalance-jun26',
    assetId: 'SPY',
    type: 'index-rebalance',
    title: 'S&P 500 Quarterly Rebalance',
    date: '2026-06-20',
    description: 'Quarterly index rebalancing — constituent changes take effect at market close.',
  },

  // ETH
  {
    id: 'eth-pectra-upgrade',
    assetId: 'ETH',
    type: 'report',
    title: 'Ethereum Pectra Upgrade',
    date: '2026-05-20',
    description: 'Pectra hard fork activated — EIP-7702 account abstraction and staking improvements live.',
  },
  {
    id: 'eth-devcon-26',
    assetId: 'ETH',
    type: 'conference',
    title: 'Devcon 8',
    date: '2026-11-10',
    description: 'Annual Ethereum developer conference. Location TBA.',
  },

  // AMZN
  {
    id: 'amzn-earnings-q1-26',
    assetId: 'AMZN',
    type: 'earnings',
    title: 'Q1 2026 Earnings Release',
    date: '2026-05-02',
    description: 'Amazon reported AWS revenue of $31.5B, up 23% YoY.',
  },
  {
    id: 'amzn-aws-summit-26',
    assetId: 'AMZN',
    type: 'conference',
    title: 'AWS re:Inforce 2026',
    date: '2026-06-17',
    description: 'Annual AWS security and cloud conference — new AI infrastructure announcements.',
  },
  {
    id: 'amzn-earnings-q2-26',
    assetId: 'AMZN',
    type: 'earnings',
    title: 'Q2 2026 Earnings Release',
    date: '2026-08-01',
    description: 'Quarterly results covering April–June 2026.',
  },

  // TSLA
  {
    id: 'tsla-earnings-q1-26',
    assetId: 'TSLA',
    type: 'earnings',
    title: 'Q1 2026 Earnings Release',
    date: '2026-04-23',
    description: 'Tesla delivered 387K vehicles in Q1, beating estimates.',
  },
  {
    id: 'tsla-shareholder-meeting-26',
    assetId: 'TSLA',
    type: 'agm',
    title: 'Annual Shareholder Meeting',
    date: '2026-06-19',
    description: 'Tesla annual shareholder meeting — executive compensation vote and board elections.',
  },
  {
    id: 'tsla-earnings-q2-26',
    assetId: 'TSLA',
    type: 'earnings',
    title: 'Q2 2026 Earnings Release',
    date: '2026-07-22',
    description: 'Quarterly results and delivery figures for April–June 2026.',
  },

  // DE10Y
  {
    id: 'de10y-auction-jun26',
    assetId: 'DE10Y',
    type: 'report',
    title: 'Bund Auction — 10Y',
    date: '2026-06-11',
    description: 'German Federal Government 10-year bond auction. €4B target volume.',
  },
  {
    id: 'de10y-coupon-aug26',
    assetId: 'DE10Y',
    type: 'dividend',
    title: 'Coupon Payment',
    date: '2026-08-15',
    description: 'Semi-annual coupon payment on German 10Y Bund benchmark.',
  },
];

export function getEventsForHoldings(assetIds: string[]): InvestorEvent[] {
  const today = new Date(new Date().toDateString());
  const sixMonthsAgo = new Date(today);
  sixMonthsAgo.setMonth(today.getMonth() - 2);
  const sixMonthsAhead = new Date(today);
  sixMonthsAhead.setMonth(today.getMonth() + 4);

  return ALL_EVENTS
    .filter((e) => {
      if (!assetIds.includes(e.assetId)) return false;
      const d = new Date(e.date);
      return d >= sixMonthsAgo && d <= sixMonthsAhead;
    })
    .sort((a, b) => {
      const da = new Date(a.date).getTime();
      const db = new Date(b.date).getTime();
      const todayTs = today.getTime();
      // Upcoming first (closest), then past (most recent first)
      const aUpcoming = da >= todayTs;
      const bUpcoming = db >= todayTs;
      if (aUpcoming && bUpcoming) return da - db;
      if (!aUpcoming && !bUpcoming) return db - da;
      return aUpcoming ? -1 : 1;
    });
}
