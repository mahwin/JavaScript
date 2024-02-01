import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import type { ChartData } from "../../pages/TwoDChartPage";

interface Props {
  chartData: ChartData;
  performanceType: string;
  ratialType: string;
}

export function TwoDLineChart({
  chartData,
  performanceType,
  ratialType,
}: Props) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext("2d") as CanvasRenderingContext2D;

    const data = {
      labels: chartData["Map"].labels,
      datasets: [
        {
          label: "Map",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: chartData["Map"].data,
          tension: 0.1,
          fill: false,
        },
        {
          label: "Object",
          backgroundColor: "blue",
          borderColor: "blue",
          data: chartData["Object"].data,
          tension: 0.1,
          fill: false,
        },
      ],
    };

    const chart = new Chart(ctx, {
      type: "line",
      data: data,
      options: {
        scales: {
          x: {
            type: "linear",
            display: true,
            position: "bottom",
            title: {
              display: true,
              text:
                ratialType === "accessRatial"
                  ? "수정/삭제 확률 (%)"
                  : "접근 확률 (%)",
              font: {
                size: 15,
              },
            },
          },
          y: {
            type: "linear",
            display: true,
            position: "bottom",
            title: {
              display: true,
              text:
                performanceType === "time"
                  ? "걸린 시간 (ms)"
                  : "사용 메모리 (MB)",
              font: {
                size: 15,
              },
            },
          },
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }, [ratialType, performanceType, chartData]);
  return <canvas ref={chartRef} />;
}
