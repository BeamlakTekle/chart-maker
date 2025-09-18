"use client";
import { useState } from "react";
import CsvUploader from "../components/CsvUploader";
import DataPreview from "../components/DataPreview";
import ChartCanvas from "../components/ChartCanvas";
import { inferColumns } from "../lib/csv";
import type { Row, ColumnMeta } from "../lib/types";

export default function Home() {
  const [rows, setRows] = useState<Row[]>([]);
  const [columns, setColumns] = useState<ColumnMeta[]>([]);
  const [x, setX] = useState("");
  const [y, setY] = useState("");
  const [chart, setChart] = useState<"bar" | "line" | "scatter" | "pie">("bar");

  function onLoaded(r: Row[]) {
    setRows(r);
    const meta = inferColumns(r);
    setColumns(meta);
    setX(meta[0]?.name ?? "");
    setY(meta.find((m) => m.kind === "numeric")?.name ?? "");
  }

  return (
    <main className="min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">

        {/* HERO — centered title/logo */}
        <header className="min-h-[40vh] flex flex-col items-center justify-center gap-3 text-center">
          <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
              <rect x="3" y="10" width="3" height="10" rx="1" fill="#6366f1" />
              <rect x="9" y="6" width="3" height="14" rx="1" fill="#22c55e" />
              <rect x="15" y="13" width="3" height="7" rx="1" fill="#f59e0b" />
              <path d="M3 14l6-4 6 5 6-6" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" fill="none" />
            </svg>
          </div>
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-fuchsia-600 bg-clip-text text-transparent">
            Chart Maker
          </h1>
          <p className="text-slate-700 text-lg">
            Upload a CSV, preview the data, and instantly create charts.
          </p>
        </header>

        <div className="h-px bg-slate-300/70" />

        {/* uploader + preview */}
        <section className="grid md:grid-cols-2 gap-6">
          <CsvUploader onLoaded={onLoaded} />
          {rows.length > 0 && <DataPreview rows={rows} />}
        </section>

        {rows.length > 0 && (
          <>
            <div className="h-px bg-slate-300/70" />

            {/* controls */}
            <section className="p-6 rounded-2xl border border-slate-200 bg-white/90 shadow-sm grid md:grid-cols-3 gap-4 backdrop-blur">
              <label className="text-sm font-medium">
                Chart type
                <select
                  value={chart}
                  onChange={(e) => {
                    const next = e.target.value as typeof chart;
                    setChart(next);
                    if (next === "scatter") {
                      // ensure both axes are numeric for scatter
                      const firstNum = columns.find((c) => c.kind === "numeric")?.name ?? "";
                      if (!columns.find((c) => c.name === x && c.kind === "numeric")) setX(firstNum);
                      if (!columns.find((c) => c.name === y && c.kind === "numeric")) setY(firstNum);
                    }
                  }}
                  className="mt-1 w-full border border-slate-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="bar">Bar</option>
                  <option value="line">Line</option>
                  <option value="scatter">Scatter</option>
                  <option value="pie">Pie</option>
                </select>
              </label>

              <label className="text-sm font-medium">
                X column
                <select
                  value={x}
                  onChange={(e) => setX(e.target.value)}
                  className="mt-1 w-full border border-slate-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {(chart === "scatter" ? columns.filter((c) => c.kind === "numeric") : columns)
                    .map((c) => (
                      <option key={c.name}>{c.name}</option>
                    ))}
                </select>
              </label>

              <label className="text-sm font-medium">
                Y column
                <select
                  value={y}
                  onChange={(e) => setY(e.target.value)}
                  className="mt-1 w-full border border-slate-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {columns
                    .filter((c) => c.kind === "numeric")
                    .map((c) => (
                      <option key={c.name}>{c.name}</option>
                    ))}
                </select>
              </label>
            </section>

            {/* chart */}
            <ChartCanvas rows={rows} chart={chart} x={x} y={y} title={`${y} vs ${x}`} />
          </>
        )}
      </div>
    </main>
  );
}
