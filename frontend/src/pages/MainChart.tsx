import { useEffect, useState } from "react";
import { Slider } from "../component/Slider";
import { ThreeDLineChart } from "../component/ThreeDLineChart";
import totalJson from "../assets/result.json";

import styled from "styled-components";

export type PropertiesNum = keyof typeof totalJson;
export type GraphData = (typeof totalJson)[PropertiesNum];

export function MainChart() {
  const [propertiesNum, setPropertiesNum] = useState<PropertiesNum>("100000");
  const [graphData, setGraphData] = useState<GraphData>();

  useEffect(() => {
    if (!totalJson[propertiesNum]) return;
    console.log(totalJson[propertiesNum]);
    setGraphData(totalJson[propertiesNum]);
  }, [propertiesNum]);
  return (
    <ChartContainer>
      <Row>
        {graphData && <ThreeDLineChart {...{ type: "Time", graphData }} />}
        {graphData && <ThreeDLineChart {...{ type: "Memory", graphData }} />}
      </Row>
      <Slider {...{ propertiesNum, setPropertiesNum }}></Slider>
    </ChartContainer>
  );
}

const ChartContainer = styled.div`
  border: 2px solid smokegray;
`;

const Row = styled.div`
  display: flex;
`;
