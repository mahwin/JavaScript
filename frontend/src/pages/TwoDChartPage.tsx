import { Slider } from "../component/Slider";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { intSeperateComma, floatToRatial } from "../utils";
import resultJSON from "../assets/result.json";
import { TwoDLineChart } from "../component/TwoDLineChart";
import { Tap } from "../component/Tap";

export type ResultJson = typeof resultJSON;

export type ChartData = Record<
  MapOrObject,
  Record<"labels" | "data", number[]>
>;

type PropertiesNum = keyof typeof resultJSON;
type MapOrObject = keyof (typeof resultJSON)[PropertiesNum];

type PerformanceType = "time" | "memory";
type RatialType = "accessRatial" | "updateOrDeleteRatial";

const 십만 = 100_000;
const maxRange = 69 * 십만;
const minRange = 1 * 십만;

const RATAIL_ARRAY = Array.from({ length: 11 }, (_, i) => i * 10);

export function TwoDChartPage() {
  const [propertiesNum, setPropertiesNum] = useState<number>(100000);
  const [ratial, setRatial] = useState<number>(0);

  const [ratialType, setRatialType] = useState<string>("updateOrDeleteRatial");
  const [performanceType, setPerformanceType] = useState<string>("time");

  const [chartData, setChartData] = useState<ChartData>({
    Map: { labels: RATAIL_ARRAY, data: [] },
    Object: { labels: RATAIL_ARRAY, data: [] },
  });

  useEffect(() => {
    if (!resultJSON) return;

    const newChartData: ChartData = {
      Map: { labels: RATAIL_ARRAY, data: [] },
      Object: { labels: RATAIL_ARRAY, data: [] },
    };

    for (const key of ["Map", "Object"]) {
      const targetData =
        resultJSON[propertiesNum.toString() as PropertiesNum][
          key as MapOrObject
        ];

      targetData.forEach((line) => {
        if (line[ratialType as RatialType] == ratial.toString()) {
          newChartData[key as "Map" | "Object"].data.push(
            parseFloat(line[performanceType as PerformanceType])
          );
        }
      });
    }

    setChartData({ ...newChartData });
  }, [propertiesNum, ratial, ratialType, performanceType]);

  return (
    <Container>
      <TwoDLineChart {...{ chartData, performanceType, ratialType }} />
      <TapContainer>
        <Row>
          <Tap
            value={performanceType}
            setValue={setPerformanceType}
            tapInfo={{
              name: "performance",
              tapNum: 2,
              ids: ["time", "memory"],
              labels: ["time", "memory"],
            }}
          />
          <Tap
            value={ratialType}
            setValue={setRatialType}
            tapInfo={{
              name: "ratial",
              tapNum: 2,
              ids: ["updateOrDeleteRatial", "accessRatial"],
              labels: ["수정/삭제 고정", "접근 고정"],
            }}
          />
        </Row>
      </TapContainer>
      <SliderContainer>
        <Slider
          {...{
            value: ratial,
            setValue: setRatial,
            minRange: 0,
            maxRange: 1,
            step: 0.1,
            formatter: floatToRatial,
          }}
        />
        <Slider
          {...{
            value: propertiesNum,
            setValue: setPropertiesNum,
            minRange: minRange,
            maxRange: maxRange,
            step: 100000,
            formatter: intSeperateComma,
          }}
        />
      </SliderContainer>
    </Container>
  );
}

const TapContainer = styled.div`
  display: flex;
  justify-content: end;
`;
const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Container = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
`;
