import { Row } from "./types";

/** Fixed  (cycled as needed) */
export const FIXED_COLORS = [
  "#22c55e", // green
  "#3b82f6", // blue
  "#ef4444", // red
  "#f59e0b", // orange/amber
  "#eab308", // yellow
  "#14b8a6", // teal
  "#06b6d4", // cyan
  "#84cc16", // lime
  "#8B4513", // brown
  "#64748b", // slate gray
];

export function palette(n: number) {
  return Array.from({ length: Math.max(n, 1) }, (_, i) => FIXED_COLORS[i % FIXED_COLORS.length]);
}

// --- rest stays the same ---
export function toBarLineData(rows: Row[], xKey: string, yKey: string) {
  const labels = rows.map((r) => String(r[xKey] ?? ""));
  const data = rows.map((r) => Number(r[yKey] ?? 0));
  return { labels, datasets: [{ label: yKey, data }] };
}

export function toScatterData(rows: Row[], xKey: string, yKey: string) {
  const points = rows
    .map((r) => ({ x: Number(r[xKey]), y: Number(r[yKey]) }))
    .filter((p) => Number.isFinite(p.x) && Number.isFinite(p.y));
  return { datasets: [{ label: `${yKey} vs ${xKey}`, data: points }] };
}

export function toPieData(rows: Row[], catKey: string, valKey: string) {
  const map = new Map<string, number>();
  for (const r of rows) {
    const k = String(r[catKey] ?? "");
    const v = Number(r[valKey] ?? 0) || 0;
    map.set(k, (map.get(k) ?? 0) + v);
  }
  const labels = [...map.keys()];
  const data = [...map.values()];
  const colors = palette(labels.length);

  return {
    labels,
    datasets: [
      { label: valKey, data, backgroundColor: colors, borderColor: "white", borderWidth: 2 },
    ],
  };
}
