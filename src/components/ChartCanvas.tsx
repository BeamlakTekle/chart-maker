/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Bar, Line, Scatter, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, BarElement, LineElement, PointElement,
  Tooltip, Legend, ArcElement
} from "chart.js";
import { Row } from "../lib/types";
// add FIXED_COLORS to the import
import { toBarLineData, toPieData, toScatterData, palette, FIXED_COLORS } from "../lib/chart";


ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Tooltip, Legend, ArcElement);

export default function ChartCanvas({
  rows, chart, x, y, title
}: { rows: Row[]; chart: "bar"|"line"|"scatter"|"pie"; x: string; y: string; title?: string }) {
  let Comp: any, data: any;

  const baseOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" as const },
      title: { display: !!title, text: title }
    }
  };

  if (chart === "bar") {
    Comp = Bar;
    data = toBarLineData(rows, x, y);
    const colors = palette(data.labels.length);
    data.datasets[0].backgroundColor = colors;
    data.datasets[0].borderColor = colors;
    data.datasets[0].borderWidth = 1;
  } else if (chart === "line") {
    Comp = Line;
    data = toBarLineData(rows, x, y);
    const color = FIXED_COLORS[1]; // blue
    data.datasets[0].borderColor = color;
    data.datasets[0].pointBackgroundColor = color;
    data.datasets[0].borderWidth = 2;
    data.datasets[0].tension = 0.3;  // nice curve
    baseOptions.plugins.legend.display = true;
  } else if (chart === "scatter") {
    Comp = Scatter;
    data = toScatterData(rows, x, y);
    const colors = palette(data.datasets[0].data.length || 1);
    data.datasets[0].pointBackgroundColor = colors;
    data.datasets[0].pointBorderColor = colors;
    data.datasets[0].pointRadius = 5;
    data.datasets[0].pointHoverRadius = 6;
    data.datasets[0].showLine = false;
  } else {
    Comp = Pie;
    data = toPieData(rows, x, y); // already colorful
  }

  return (
    <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
      <p className="font-semibold text-slate-800 mb-3">3) Chart</p>
      <div className="relative h-[560px]">{/* taller chart area */}
        <Comp data={data} options={baseOptions} />
      </div>
    </div>
  );
}

