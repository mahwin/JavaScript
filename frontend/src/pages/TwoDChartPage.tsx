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

type TmpChartData = Record<MapOrObject, Record<number | string, number[]>>;

type PropertiesNum = keyof typeof resultJSON;
type MapOrObject = keyof (typeof resultJSON)[PropertiesNum];

type PerformanceType = "time" | "memory";
type RatialType = "accessRatial" | "updateOrDeleteRatial";

const 십만 = 100_000;
const maxRange = 69 * 십만;
const minRange = 1 * 십만;

const RATAIL_ARRAY = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];

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

    const tmpChartData: TmpChartData = {
      Map: {},
      Object: {},
    };

    const newChartData: ChartData = {
      Map: { labels: RATAIL_ARRAY, data: [] },
      Object: { labels: RATAIL_ARRAY, data: [] },
    };

    RATAIL_ARRAY.forEach((el) => {
      tmpChartData["Map"][el] = [];
      tmpChartData["Object"][el] = [];
    });

    for (const key of ["Map", "Object"]) {
      const targetData =
        resultJSON[propertiesNum.toString() as PropertiesNum][
          key as MapOrObject
        ];

      targetData.forEach((line) => {
        (
          tmpChartData[key as MapOrObject][
            line[ratialType as RatialType]
          ] as number[]
        ).push(parseFloat(line[performanceType as PerformanceType]));
      });
    }

    for (const key of ["Map", "Object"]) {
      for (const ratial of RATAIL_ARRAY) {
        const performanceArr = tmpChartData[key as MapOrObject][ratial];
        const filterPerformanceArr = performanceArr.slice(
          2,
          performanceArr.length - 2
        );

        const performanceAvg = parseInt(
          (
            filterPerformanceArr.reduce((acc, cur) => acc + cur, 0) /
            filterPerformanceArr.length
          ).toFixed(2)
        );
        newChartData[key as MapOrObject]["data"].push(performanceAvg);
      }
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
              labels: ["수정/삭제 확률", "접근 확률"],
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
