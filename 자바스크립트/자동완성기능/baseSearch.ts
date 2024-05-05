import { filter, pipe, take, curry, toArray, countBy } from "@fxts/core";
import type { wordInfo } from "./type.js";

const isSubstringInString = curry((subString: string, string: string) =>
  string.startsWith(subString)
);

const print = curry((arr: Iterable) => {
  console.log(`baseSearch : ${arr.length}개를 찾았습니다.`);
});

export const baseSearch = curry((iter: Iterable<wordInfo>, subString: string) =>
  pipe(
    iter,
    filter(({ word }) => isSubstringInString(subString, word)),
    take(10),
    toArray,
    print
  )
);
