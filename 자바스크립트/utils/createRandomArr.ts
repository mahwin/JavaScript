import { intToString } from "./";

type elementTypes = "string" | "number" | "boolean" | "symbol" | "bigint";

export function createRandomArr(
  프로퍼티_수: number,
  elementTypes: elementTypes[]
) {
  let keys = new Set();
  while (keys.size !== 프로퍼티_수) {
    const randomKey = Math.floor(Number.MAX_SAFE_INTEGER * Math.random());
    elementTypes.forEach((type) => {
      switch (type) {
        case "string":
          keys.add(intToString(randomKey));
          break;
        case "number":
          keys.add(randomKey);
          break;
      }
      if (keys.size === 프로퍼티_수) return;
    });
  }
  return Array.from(keys) as elementTypes[];
}
