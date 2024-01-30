import React, { useEffect, useRef } from "react";

import styled from "styled-components";

type SliderProps = {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  minRange: number;
  maxRange: number;
  step: number;
  formatter: (value: number) => string;
};

export function Slider({
  minRange,
  maxRange,
  value,
  setValue,
  step,
  formatter,
}: SliderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(+e.target.value as number);
  };

  useEffect(() => {
    if (!inputRef.current) return;

    const percent = Math.floor((Number(value) / maxRange) * 100);

    inputRef.current.style.background = `linear-gradient(to right, #FFE283 0%, #FFE283 ${percent}%, rgb(236, 236, 236) ${percent}%, rgb(236, 236, 236) 100%)`;
  }, [value]);

  return (
    <SliderContainer>
      <SliderInput
        ref={inputRef}
        type="range"
        value={value}
        min={minRange}
        max={maxRange}
        step={step}
        onChange={handleChange}
      />
      <SlideNumDisplay>
        <span>{formatter(value)}</span>
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

const SliderInput = styled.input`
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
