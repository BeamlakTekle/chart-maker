# Chart Maker (Next.js + Tailwind + Chart.js)

Upload a CSV, preview the first 10 rows, auto-detect column types, and instantly render Bar / Line / Scatter / Pie charts.

## Live Demo
- (add after deploy) **Vercel:** https://your-vercel-url.vercel.app

## Features
- CSV upload (PapaParse)
- Preview table with sticky header
- Auto column inference (numeric vs categorical)
- Charts: Bar, Line, Scatter, Pie (Chart.js + react-chartjs-2)
- Fixed non-purple color palette
- Clean, responsive UI (Tailwind)

## Tech
- Next.js 15 (App Router, TypeScript)
- Tailwind CSS
- Chart.js + react-chartjs-2
- PapaParse

## Getting Started
```bash
npm install
npm run dev
# open http://localhost:3000
