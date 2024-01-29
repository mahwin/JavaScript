import React from "react";

import styled from "styled-components";
import { intFormatter } from "../../utils";
import { type PropertiesNum } from "@/pages/MainChart";

const 십만 = 100_000;
const maxRange = 69 * 십만;
const minRange = 1 * 십만;

export function Slider({
  propertiesNum,
  setPropertiesNum,
}: {
  propertiesNum: PropertiesNum;
  setPropertiesNum: React.Dispatch<React.SetStateAction<PropertiesNum>>;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPropertiesNum(e.target.value as PropertiesNum);
  };

  return (
    <SliderContainer>
      <SliderInput
        type="range"
        value={propertiesNum}
        min={minRange}
        max={maxRange}
        step={십만}
        onChange={handleChange}
      />
      <SlideNumDisplay>
        <span>{intFormatter(+propertiesNum, ",")}</span>
      </SlideNumDisplay>
    </SliderContainer>
  );
}

const SlideNumDisplay = styled.div`
  width: 120px;
  position: relative;
  height: 24px;
  border: 1px solid #ffca1d;
  background-color: #ffca1d;
  border-radius: 8px;
  display: flex;
  justify-content: end;
  &:before {
    position: absolute;
    top: 3px;
    left: -8px;
    width: 0;
    height: 0;
    border-top: 8px solid transparent;
    border-right: 8px solid #ffca1d;
    border-bottom: 8px solid transparent;
    content: "";
  }
  span {
    margin-right: 8px;
    line-height: 24px;
    color: whitesmoke;
  }
`;
const calculateBackground = (slideNum: string) => {
  const percent = (Number(slideNum) / maxRange) * 100 - 0.5;

  return `linear-gradient(to right, #FFE283 0%, #FFE283 ${percent}%, rgb(236, 236, 236) ${percent}%, rgb(236, 236, 236) 100%)`;
};
const SliderInput = styled.input<{ value?: string }>`
  background: ${(props) => props.value && calculateBackground(props.value)};
  width: 100%;
  border-radius: 8px;
  outline: none;
  transition: background 450ms ease-in;
  accent-color: #ffca1d;
`;

const SliderContainer = styled.article`
  height: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 32px;
  border-radius: 4px;
`;
