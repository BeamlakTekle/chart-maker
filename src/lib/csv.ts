import Papa from "papaparse";
import { Row, ColumnMeta } from "./types";

export function parseCsv(file: File): Promise<Row[]> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (res) => resolve(res.data as Row[]),
      error: reject,
    });
  });
}

export function inferColumns(rows: Row[], sample = 40): ColumnMeta[] {
  const first = rows.slice(0, sample);
  const cols = Object.keys(first[0] ?? {});
  return cols.map((name) => {
    let numeric = 0, seen = 0;
    for (const r of first) {
      const v = r[name];
      if (v === null || v === undefined || v === "") continue;
      seen++;
      if (typeof v === "number" && Number.isFinite(v)) numeric++;
    }
    const kind = seen && numeric / seen >= 0.8 ? "numeric" : "categorical";
    return { name, kind };
  });
}
