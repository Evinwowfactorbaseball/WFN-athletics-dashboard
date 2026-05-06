# WF Athletics — Director Dashboard

A production-ready web dashboard for WF Athletics regional directors. Currently configured for the **North GA** region as a demo.

## Live demo

After deploying to Vercel, this will be available at your Vercel URL (e.g. `wf-athletics.vercel.app`).

## What it does

- **Today** — Daily call list, top 10 calls ranked by dollar impact, with scripts and tappable phone numbers
- **Scoreboard** — Overall % to goal, total collected, behind rate, win-back opportunities
- **Behind Payments** — Searchable, filterable list of all 14 behind-payment players
- **Teams** — Per-team breakdown of progress toward goals

## Stack

- React 18 + Vite
- Tailwind CSS
- lucide-react icons
- Bebas Neue + JetBrains Mono + Inter (Google Fonts)

## Local dev (optional)

```bash
npm install
npm run dev
```

## Deploy

This repo is configured for one-click deploy to Vercel. Just connect your GitHub repo to Vercel and it auto-builds on every push.
