import { Asset, AssetType } from './types';

// Color per asset type (Scalable brand palette)
export const TYPE_COLORS: Record<AssetType, string> = {
  stock: '#ABB6FF',      // Periwinkle
  etf: '#6BDBCB',        // Emerald
  crypto: '#FFC880',     // Sunflower
  fx: '#B5BAD7',         // Muted Periwinkle
  bond: '#A8D0CA',       // Muted Emerald
};

export const TYPE_LABELS: Record<AssetType, string> = {
  stock: 'Stock',
  etf: 'ETF',
  crypto: 'Crypto',
  fx: 'FX',
  bond: 'Bond',
};

export const PORTFOLIO_TOTAL_EUR = 15_000;

// All available assets
export const ALL_ASSETS: Asset[] = [
  // Default portfolio
  {
    id: 'AAPL',
    ticker: 'AAPL',
    name: 'Apple',
    type: 'stock',
    searchQuery: 'Apple Inc AAPL stock',
    dailyChangePct: 1.2,
    logoUrl: 'https://www.google.com/s2/favicons?domain=apple.com&sz=64',
  },
  {
    id: 'NVDA',
    ticker: 'NVDA',
    name: 'NVIDIA',
    type: 'stock',
    searchQuery: 'NVIDIA NVDA stock earnings',
    dailyChangePct: 3.4,
    logoUrl: 'https://www.google.com/s2/favicons?domain=nvidia.com&sz=64',
  },
  {
    id: 'IWDA',
    ticker: 'IWDA',
    name: 'iShares MSCI World ETF',
    type: 'etf',
    searchQuery: 'MSCI World ETF global equities',
    dailyChangePct: 0.6,
    logoUrl: 'https://www.google.com/s2/favicons?domain=ishares.com&sz=64',
  },
  {
    id: 'BTC',
    ticker: 'BTC',
    name: 'Bitcoin',
    type: 'crypto',
    searchQuery: 'Bitcoin cryptocurrency price',
    dailyChangePct: -2.1,
    logoUrl: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png',
  },
  {
    id: 'EURUSD',
    ticker: 'EUR/USD',
    name: 'Euro / US Dollar',
    type: 'fx',
    searchQuery: 'Euro dollar exchange rate EUR USD',
    dailyChangePct: 0.3,
  },
  // Addable assets
  {
    id: 'SAP',
    ticker: 'SAP',
    name: 'SAP SE',
    type: 'stock',
    searchQuery: 'SAP SE enterprise software stock',
    dailyChangePct: 0.8,
    logoUrl: 'https://www.google.com/s2/favicons?domain=sap.com&sz=64',
  },
  {
    id: 'VOW3',
    ticker: 'VOW3',
    name: 'Volkswagen',
    type: 'stock',
    searchQuery: 'Volkswagen automotive stock',
    dailyChangePct: -1.5,
    logoUrl: 'https://www.google.com/s2/favicons?domain=volkswagen.com&sz=64',
  },
  {
    id: 'SPY',
    ticker: 'SPY',
    name: 'S&P 500 ETF',
    type: 'etf',
    searchQuery: 'S&P 500 index ETF US equities',
    dailyChangePct: 0.7,
    logoUrl: 'https://www.google.com/s2/favicons?domain=ssga.com&sz=64',
  },
  {
    id: 'ETH',
    ticker: 'ETH',
    name: 'Ethereum',
    type: 'crypto',
    searchQuery: 'Ethereum cryptocurrency ETH',
    dailyChangePct: 4.2,
    logoUrl: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png',
  },
  {
    id: 'AMZN',
    ticker: 'AMZN',
    name: 'Amazon',
    type: 'stock',
    searchQuery: 'Amazon AMZN stock AWS',
    dailyChangePct: -0.4,
    logoUrl: 'https://www.google.com/s2/favicons?domain=amazon.com&sz=64',
  },
  {
    id: 'TSLA',
    ticker: 'TSLA',
    name: 'Tesla',
    type: 'stock',
    searchQuery: 'Tesla TSLA electric vehicle stock',
    dailyChangePct: 2.8,
    logoUrl: 'https://www.google.com/s2/favicons?domain=tesla.com&sz=64',
  },
  {
    id: 'DE10Y',
    ticker: 'DE10Y',
    name: 'German Bund 10Y',
    type: 'bond',
    searchQuery: 'German government bond Bund yield',
    dailyChangePct: -0.2,
  },
];

export const DEFAULT_PORTFOLIO_IDS = ['AAPL', 'NVDA', 'IWDA', 'BTC', 'EURUSD'];

export function getAssetById(id: string): Asset | undefined {
  return ALL_ASSETS.find((a) => a.id === id);
}
