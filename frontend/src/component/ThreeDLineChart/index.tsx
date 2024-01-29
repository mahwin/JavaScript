import { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { GraphData } from "../../pages/ThreeDChartPage";

type PosType = Record<"x" | "y" | "z", number[]>;

type Type = "Time" | "Memory";

interface Props {
  graphData: GraphData;
  type: Type;
}

export const ThreeDLineChart = ({ type, graphData }: Props) => {
  const [mapPos, setMapPos] = useState<PosType>({
    x: [],
    y: [],
    z: [],
  });

  const [objPos, setObjPos] = useState<PosType>({
    x: [],
    y: [],
    z: [],
  });
  useEffect(() => {
    const x1: number[] = [];
    const y1: number[] = [];
    const z1: number[] = [];
    graphData["Map"].forEach((data) => {
      x1.push(parseFloat(data.updateOrDeleteRatial) * 100);
      y1.push(parseFloat(data.accessRatial) * 100);
      z1.push(parseFloat(data[type.toLowerCase() as "memory" | "time"]));
    });
    setMapPos({ x: x1, y: y1, z: z1 });

    const x2: number[] = [];
    const y2: number[] = [];
    const z2: number[] = [];
    graphData["Object"].forEach((data) => {
      x2.push(parseFloat(data.updateOrDeleteRatial) * 100);
      y2.push(parseFloat(data.accessRatial) * 100);
      z2.push(parseFloat(data[type.toLowerCase() as "memory" | "time"]));
    });
    setObjPos({ x: x2, y: y2, z: z2 });
  }, [type, graphData]);
  return (
    <Plot
      data={[
        {
          x: mapPos.x,
          y: mapPos.y,
          z: mapPos.z,
          type: "scatter3d",
          mode: "markers",
          marker: { color: "rgb(255, 99, 132)", size: 2 },
          name: "Map",
        },

        {
          x: objPos.x,
          y: objPos.y,
          z: objPos.z,
          type: "scatter3d",
          mode: "markers",
          marker: { color: "blue", size: 2 },
          name: "Object",
        },
      ]}
      layout={{
        width: 600,
        height: 600,
        title: `${type} Chart`,
        scene: {
          xaxis: { title: "업데이트/삭제 비율(%)" },
          yaxis: { title: "접근 비율(%)" },
          zaxis: {
            title: `${type === "Time" ? "걸린 시간(ms)" : "사용 메모리(MB)"}`,
          },
        },
      }}
    ></Plot>
  );
};
