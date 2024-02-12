import { customObj } from "../index";

import { createRandomArr } from "../../utils";
import { random } from "../../utils";

import { expect } from "@jest/globals";

const keyType = ["string"] as "string"[];

const testCase = 10000;

const keys = createRandomArr(testCase, keyType);
const values = createRandomArr(testCase, keyType);

describe("커스텀 이터러블 객체 제대로 동작하는 지 체크", () => {
  const getOldKey = (i: number) => {
    return keys[Math.floor(Math.random() * i)];
  };

  test("update, delete 후에도 제대로 삽입 순서를 지키는 지 체크", () => {
    const map = new Map();
    for (let i = 0; i < testCase; i++) {
      const [key, value] = [keys[i], values[i]];
      map.set(key, value);
      customObj[key] = value;

      if (random(0.5)) {
        // 삭제
        const oldKey = getOldKey(i);
        map.delete(oldKey);
        delete customObj[oldKey];
      }

      if (random(0.5)) {
        // 업데이트
        const oldKey = getOldKey(i);
        map.set(oldKey, "업데이트");
        customObj[oldKey] = "업데이트";
      }

      if (random(0.5)) {
        const oldKey = getOldKey(i);
        expect(map.get(oldKey)).toBe(customObj[oldKey]);
      }
    }

    const mapIter = map[Symbol.iterator]();
    const customObjIter = customObj[Symbol.iterator]();

    let mapIterReturn = mapIter.next();
    while (mapIterReturn.done === false) {
      expect(mapIterReturn).toEqual(customObjIter.next());
      mapIterReturn = mapIter.next();
    }
  });
});
