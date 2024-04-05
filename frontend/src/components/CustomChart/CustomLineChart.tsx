import { Chart, registerables } from "chart.js";
import { useState, useEffect } from "react";
import { CustomChartsProps } from "../../interfaceHelper";
import { AssignColor } from "../../utils";

Chart.register(...registerables);

export default function CustomLineChart({
  XPairs,
  YScale,
  Label,
  chartRef,
  Category,
}: CustomChartsProps) {
  const [BackColor, setBackColor] = useState<string[]>([]);
  const [BorColor, setBorColor] = useState<string[]>([]);

  useEffect(() => {
    if (XPairs && Category) {
      let auxTuple: [string[], string[]] = AssignColor(XPairs, Category);
      setBackColor(auxTuple[0]);
      setBorColor(auxTuple[1]);
    }
  }, [XPairs, Category]);

  useEffect(() => {
    const canvas = document.getElementById(Label) as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, {
        type: "line", // Change this line
        data: {
          labels: XPairs.map((XPair) => XPair[0]),
          datasets: [
            {
              label: Label,
              data: XPairs.map((XPair) => XPair[1]),
              backgroundColor: BackColor,
              borderColor: BorColor,
              borderWidth: 2,
              fill: false,
              tension: 0.1
            },
          ],
        },
        options: {
          scales: {
            x: {
              ticks: {
                color: "white",
              },
              grid: {
                color: "white",
              },
            },
            y: {
              beginAtZero: true,
              min: YScale[0],
              max: YScale[1],
              ticks: {
                color: "#FFFFFF",
              },
              grid: {
                color: "white",
              },
            },
          },
          plugins: {
            legend: {
              labels: {
                color: "white",
              },
            },
          },
          elements: {
            point: {
              backgroundColor: "#FFFFFF",
            },
          },
          maintainAspectRatio: false,
        },
      });
  }, [XPairs, Category, BackColor, BorColor]);

  return (
    <div className="container w-full h-80 2xl:h-5/6 bg-none rounded-md">
      <canvas id={Label}></canvas>
    </div>
  );
}
