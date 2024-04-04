import { Chart, registerables } from "chart.js";
import { useState, useEffect } from "react";
import { CustomChartsProps } from "../../interfaceHelper";
import { AssignColor } from "../../utils";

Chart.register(...registerables); // Register all scale types

export default function CustomChart({
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
      type: "bar",
      data: {
        labels: XPairs.map((XPair) => XPair[0]),
        datasets: [
          {
            label: Label,
            data: XPairs.map((XPair) => XPair[1]),
            backgroundColor: BackColor,
            borderColor: BorColor,
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            min: YScale[0],
            max: YScale[1],
            ticks: {
              color: "rgba(255, 255, 255, 1)",
               // changes the color of the axis labels
            },
          },
        },
        plugins: {
          legend: {
            labels: {
              color: "rgba(255, 255, 255, 1)",
               // changes the color of the legend labels
            },
          },
        },
        elements: {
          point: {
            backgroundColor: "rgba(255, 255, 255, 1)", // changes the color of the data points
          },
        },
        maintainAspectRatio: false,
      },
    });
  }, [XPairs, Category, BackColor, BorColor]);

  return (
    <div className="container w-full h-80 bg-none rounded-md">
      <canvas id={Label}></canvas>
    </div>
  );
}
