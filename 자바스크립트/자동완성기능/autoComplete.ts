import readline from "readline";
import type { wordInfo } from "./type.js";
import { baseSearch } from "./baseSearch.js";
import { timer } from "../utils/timer.js";
import { Trie } from "./Trie.js";
import { expandArray } from "../utils/expandArray.js";

import fs from "fs";

const absolutePath =
  "/Users/jeong-youseock/Desktop/JavaScript/자바스크립트/자동완성기능/vocaInfo.txt";

const originData = expandArray<wordInfo>(
  10,
  JSON.parse(fs.readFileSync(absolutePath, "utf-8"))
);

const testInfo: { trie: Trie; sortedData: wordInfo[] } = {
  trie: new Trie(10),
  sortedData: [],
};

const sotedData = (originData: wordInfo[]) => {
  testInfo.sortedData = originData.sort(
    (a, b) => Number(a.frequency) - Number(b.frequency)
  );
};

const fillTrie = (data: Array<wordInfo>) => {
  for (const a of data) {
    testInfo.trie.insert(a);
  }
};

timer("sortedData", () => sotedData(originData));
timer("fillTrie", () => fillTrie(testInfo.sortedData));

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.on("line", (line) => {
  if (line == "exit") rl.close();

  console.log(">>>>>>>>>>>>>>>>>>>>>>>>");
  console.log(`입력한 단어: ${line}`);

  timer("baseSearch", () => baseSearch(testInfo.sortedData, line));
  timer("trieSearch", () => testInfo.trie.search(line));
  console.log("<<<<<<<<<<<<<<<<<<<<<<<<");
}).on("close", () => {
  console.log("프로세스를 종료합니다.");
});
