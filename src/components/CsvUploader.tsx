"use client";
import { useRef } from "react";
import { parseCsv } from "../lib/csv";
import type { Row } from "../lib/types";

export default function CsvUploader({ onLoaded }:{ onLoaded:(rows:Row[])=>void }) {
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    const rows = await parseCsv(file);
    onLoaded(rows);
  }

  return (
    <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
      <p className="font-semibold text-slate-800">1) Upload CSV</p>
      <input
        ref={inputRef}
        type="file"
        accept=".csv"
        onChange={(e)=>{ const f=e.target.files?.[0]; if (f) handleFile(f); }}
        className="mt-3 block w-full text-sm
             file:mr-4 file:py-2 file:px-4
             file:rounded-md file:border-0
             file:bg-indigo-600 file:text-white
             hover:file:bg-indigo-700 cursor-pointer"
      />
      <p className="text-xs text-slate-500 mt-3">Tip: headers in the first row.</p>
    </div>
  );
}
