# Personalised Financial News Feed (POC)

A proof-of-concept for a portfolio-weighted AI newsfeed that surfaces relevant financial news based on a user's holdings.

**Live:** https://personalised-financial-news-feed.vercel.app

## Project structure

```
app/
  page.tsx          # Main page — state management, layout
  globals.css       # Brand tokens + Inter font
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
