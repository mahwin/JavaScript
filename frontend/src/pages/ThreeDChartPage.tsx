import { useEffect, useState } from "react";
import { Slider } from "../component/Slider";
import { ThreeDLineChart } from "../component/ThreeDLineChart";
import totalJson from "../assets/result.json";
import { intSeperateComma } from "../utils";

import styled from "styled-components";

export type PropertiesNum = keyof typeof totalJson;
export type GraphData = (typeof totalJson)[PropertiesNum];

const 십만 = 100_000;
const maxRange = 69 * 십만;
const minRange = 1 * 십만;

export function MainChart() {
  const [propertiesNum, setPropertiesNum] = useState<number>(100000);
  const [graphData, setGraphData] = useState<GraphData>();

  useEffect(() => {
    if (!totalJson[propertiesNum.toString() as PropertiesNum]) return;
    setGraphData(totalJson[propertiesNum.toString() as PropertiesNum]);
  }, [propertiesNum]);
  return (
    <ChartContainer>
      <Row>
        {graphData && <ThreeDLineChart {...{ type: "Time", graphData }} />}
        {graphData && <ThreeDLineChart {...{ type: "Memory", graphData }} />}
      </Row>
      <Slider
        {...{
          minRange: minRange,
          maxRange: maxRange,
          value: propertiesNum,
          setValue: setPropertiesNum,
          step: 100000,
          formatter: intSeperateComma,
        }}
      ></Slider>
    </ChartContainer>
  );
}

const ChartContainer = styled.div`
  border: 2px solid smokegray;
`;

const Row = styled.div`
  display: flex;
`;
