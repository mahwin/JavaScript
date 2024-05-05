import readline from "readline";

import { baseSearch } from "./baseSearch.js";
import { timer } from "../utils/timer.js";

const expandArray = <T>(l: number, originData: Array<T>) => {
  const res = [];
  while (l--) {
    res.push(...originData);
  }
  return res;
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (line) => {
  if (line == "exit") rl.close();

  timer("baseSearch", () => baseSearch(line));
}).on("close", () => {
  console.log("프로세스를 종료합니다.");
});
