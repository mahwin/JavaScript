import styled from "styled-components";
import React, { Fragment } from "react";

interface TapProps {
  value: string;
  setValue: (prev: string) => void;
  tapInfo: { name: string; tapNum: number; labels: string[]; ids: string[] };
}

export function Tap({ value, setValue, tapInfo }: TapProps) {
  const spanRef = React.useRef<HTMLSpanElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const idIdx = tapInfo.ids.indexOf(e.currentTarget.id);
    setValue(tapInfo.ids[idIdx]);
    spanRef.current!.style.transform = `translateX(${idIdx * 100}%)`;
  };
  return (
    <TapContainer>
      <TapItem>
        {Array.from({ length: tapInfo.tapNum }, (_, i) => (
          <Fragment key={i}>
            <RadioInput
              name={tapInfo.name}
              id={tapInfo.ids[i]}
              onClick={handleClick}
              defaultChecked={value === tapInfo.ids[i]}
            />
            <Label htmlFor={tapInfo.ids[i]}>{tapInfo.labels[i]}</Label>
          </Fragment>
        ))}

        <Span ref={spanRef} />
      </TapItem>
    </TapContainer>
  );
}

const TapContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 160px;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 99px;
  cursor: pointer;
  transition: color 0.15s ease-in;
`;

const TapItem = styled.div`
  display: flex;
  position: relative;
  box-shadow: 0 0 1px 0 rgba(#185ee0, 0.15), 0 6px 12px 0 rgba(#185ee0, 0.15);
  padding: 0.75rem;
  border-radius: 99px;
  * {
    z-index: 2;
  }
`;

const Span = styled.span`
  position: absolute;
  display: flex;
  height: 30px;
  width: 160px;
  background-color: #e6eef9;
  z-index: 1;
  border-radius: 99px;
  transition: 0.25s ease-out;
`;

const RadioInput = styled.input.attrs({ type: "radio" })`
  &:checked {
    & + label {
      color: #185ee0;
    }
  }
`;
