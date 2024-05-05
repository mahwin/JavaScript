import fs from "fs";
import { filter, pipe, take, curry, toArray } from "@fxts/core";
import { timer } from "../utils/timer.js";
const log = console.log;

type wordInfo = {
  id: number;
  category: string;
  level: string;
  word: string;
  mean: string;
  frequency: string;
  createdAt: string;
  updatedAt: string;
};
const absolutePath =
  "/Users/jeong-youseock/Desktop/JavaScript/자바스크립트/자동완성기능/vocaInfo.txt";

const originData = JSON.parse(
  fs.readFileSync(absolutePath, "utf-8")
) as Array<wordInfo>;

const isSubstringInString = curry((subString: string, { word }: wordInfo) =>
  word.includes(subString)
);

let sortedData: Array<wordInfo> = [];

const sortByFrequency = (origin: Array<wordInfo>) => {
  sortedData = origin.sort((a, b) => Number(a.frequency) - Number());
};

timer("sortByFrequency", () => sortByFrequency(originData));

export const baseSearch = (subString: string) =>
  pipe(sortedData, filter(isSubstringInString(subString)), take(10), toArray);
