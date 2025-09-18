"use client";
import type { Row } from "../lib/types";

export default function DataPreview({ rows }:{ rows: Row[] }) {
  const sample = rows.slice(0, 10);
  const cols = Object.keys(sample[0] ?? {});
  if (!cols.length) return null;

  return (
    <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
      <p className="font-semibold text-slate-800 mb-3">2) Preview (first 10 rows)</p>
      <div className="max-h-64 overflow-auto rounded-md border border-slate-200">
        <table className="text-sm min-w-full">
          <thead className="bg-slate-100 text-slate-800 sticky top-0">
            <tr>
              {cols.map(c=> (
                <th key={c} className="px-3 py-2 border-b border-slate-200 text-left whitespace-nowrap">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sample.map((r,i)=>(
              <tr key={i} className="odd:bg-white even:bg-slate-50">
                {cols.map(c=> (
                  <td key={c} className="px-3 py-1.5 border-b border-slate-100">
                    {String(r[c]??"")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-slate-500 mt-2">
        Rows shown: {sample.length} • Columns: {cols.length}
      </p>
    </div>
  );
}

