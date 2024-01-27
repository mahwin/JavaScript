// import { ScatterChart } from "../component/Chart";
import { dataFormatter } from "../utils";
import mapResult from "../assets/mapResult.csv";
import objResult from "../assets/objectResult.csv";

import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const mapData = {
  datasets: [
    {
      label: "Map Dataset",
      data: dataFormatter("Scatter", "time", mapResult),
      backgroundColor: "rgb(255, 99, 132)",
    },
    {
      label: "Object Dataset",
      data: dataFormatter("Scatter", "time", objResult),
      backgroundColor: "blue",
    },
  ],
};
const objData = {
  datasets: [
    {
      label: "Map Dataset",
      data: dataFormatter("Scatter", "memory", mapResult),
      backgroundColor: "rgb(255, 99, 132)",
    },
    {
      label: "Object Dataset",
      data: dataFormatter("Scatter", "memory", objResult),
      backgroundColor: "blue",
    },
  ],
};

export function ScatterChartPage() {
  const timeChartRef = useRef(null);
  const memoryChartRef = useRef(null);
  useEffect(() => {
    if (!timeChartRef.current) return;
    const timeCtx = (timeChartRef.current as HTMLCanvasElement).getContext(
      "2d"
    ) as CanvasRenderingContext2D;

    const timeChart = new Chart(timeCtx, {
      type: "scatter",
      data: mapData,
      options: {
        scales: {
          x: {
            type: "linear",
            display: true,
            position: "bottom",
            title: {
              display: true,
              text: "프로퍼티의 수",
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
              text: "걸린 시간(ms)",
              font: {
                size: 15,
              },
            },
          },
        },
      },
    });
    if (!memoryChartRef.current) return;
    const memoryCtx = (memoryChartRef.current as HTMLCanvasElement).getContext(
      "2d"
    ) as CanvasRenderingContext2D;

    const memoryChart = new Chart(memoryCtx, {
      type: "scatter",
      data: objData,
      options: {
        scales: {
          x: {
            type: "linear",
            display: true,
            position: "bottom",
            title: {
              display: true,
              text: "프로퍼티의 수",
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
              text: "메모리 사용량(MB)",
              font: {
                size: 15,
              },
            },
          },
        },
      },
    });

    return () => {
      timeChart.destroy();
      memoryChart.destroy();
    };
  }, []);

  return (
    <>
      <canvas ref={timeChartRef} />
      <canvas ref={memoryChartRef} />
    </>
  );
}
