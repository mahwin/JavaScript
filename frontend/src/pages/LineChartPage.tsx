import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { dataFormatter } from "../utils/dataFormatter";
import compressedMapResult from "../assets/compressedMapResult.csv";
import compressedObjectResult from "../assets/compressedObjectResult.csv";

export function LineChartPage() {
  const timeLineChartRef = useRef(null);
  const memoryLineChartRef = useRef(null);
  useEffect(() => {
    if (!timeLineChartRef.current) return;

    const timeCtx = (timeLineChartRef.current as HTMLCanvasElement).getContext(
      "2d"
    ) as CanvasRenderingContext2D;

    const timeChart = new Chart(timeCtx, {
      type: "line",
      data: {
        datasets: [
          {
            label: "Map Dataset",
            data: dataFormatter("Line", "time", compressedMapResult),
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
          {
            label: "Object Dataset",
            data: dataFormatter("Line", "time", compressedObjectResult),
            fill: false,
            borderColor: "blue",
            tension: 0.1,
          },
        ],
      },
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

    if (!memoryLineChartRef.current) return;
    const memoryCtx = (
      memoryLineChartRef.current as HTMLCanvasElement
    ).getContext("2d") as CanvasRenderingContext2D;
    const memoryChart = new Chart(memoryCtx, {
      type: "line",
      data: {
        datasets: [
          {
            label: "Map Dataset",
            data: dataFormatter("Line", "memory", compressedMapResult),
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
          {
            label: "Object Dataset",
            data: dataFormatter("Line", "memory", compressedObjectResult),
            fill: false,
            borderColor: "blue",
            tension: 0.1,
          },
        ],
      },
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
              text: "메모리(MB)",
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
      <canvas ref={timeLineChartRef}></canvas>
      <canvas ref={memoryLineChartRef}></canvas>
    </>
  );
}
