# 📊 Chart Maker

A tiny web app that turns your CSV into clean, readable charts in seconds.  
Upload a CSV → preview the first 10 rows → pick X/Y → choose Bar/Line/Scatter/Pie → done.

**Live:** https://chart-maker-nine.vercel.app  • **Source:** https://github.com/BeamlakTekle/chart-maker

---

## ✨ Features
- CSV upload (client-side via PapaParse — your data stays in the browser)
- Preview table with sticky header (first 10 rows)
- Auto-detection of column types (numeric vs categorical)
- Charts: Bar, Line, Scatter, Pie (Chart.js + react-chartjs-2)
- Fixed color palette for clarity
- Scatter guardrails (only numeric X & Y to avoid blank charts)
- Clean, responsive UI with Tailwind

---

## 🚀 Quick Start

## 🧑‍💻 How to Use
1. Click **Choose File** and upload a `.csv` (first row = headers).
2. Verify the **Preview** (first 10 rows).
3. Pick a **chart type** and select **X** / **Y** columns.
4. For **Scatter**, both X and Y must be numeric (the UI helps with this).
5. View your chart


---

🧰 Tech

Next.js 15 (App Router, TypeScript)

Tailwind CSS

Chart.js + react-chartjs-2

PapaParse


**Requirements:** Node 18+ (tested on Node 22)

```bash
npm install
npm run dev
# open http://localhost:3000