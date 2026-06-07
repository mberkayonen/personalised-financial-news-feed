# Scalable Capital – Personalised Investment Feed (POC)

A proof-of-concept for a portfolio-weighted AI newsfeed, built for the Scalable Capital PM assignment.

## Setup

### 1. Get API keys

- **Anthropic API key** → https://console.anthropic.com
- **NewsAPI key** (free tier) → https://newsapi.org/register

### 2. Install dependencies

```bash
cd scalable-feed
npm install
```

### 3. Set environment variables

```bash
cp .env.example .env.local
# Edit .env.local and fill in both keys
```

### 4. Run locally

```bash
npm run dev
# Open http://localhost:3000
```

## Deploy to Vercel

```bash
npm install -g vercel   # if not already installed
vercel deploy
```

When prompted, set these environment variables in the Vercel dashboard
(Project → Settings → Environment Variables):

- `ANTHROPIC_API_KEY`
- `NEWS_API_KEY`

Or set them upfront via CLI:

```bash
vercel env add ANTHROPIC_API_KEY
vercel env add NEWS_API_KEY
vercel deploy --prod
```

## Project structure

```
app/
  page.tsx          # Main page — state management, layout
  globals.css       # Scalable brand tokens + Inter font
  api/feed/
    route.ts        # Serverless function: NewsAPI → Claude → JSON feed
components/
  Portfolio.tsx     # Holdings list, weight bars, add/remove
  NewsFeed.tsx      # Feed container, loading states
  NewsCard.tsx      # Individual news card
lib/
  assets.ts         # All asset definitions + default portfolio
  types.ts          # TypeScript interfaces
```
