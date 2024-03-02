import { MyMap } from "../MyMap";
import { createRandomInt } from "../../utils";

describe("Map 객체 생성", () => {
  test("독립 적인 키 저장 잘 하는지", () => {
    const map = new MyMap();
    map.set(0, 2);
    expect(map.get(0)).toBe(2);
    expect(map.size).toBe(1);

    map.set(1, false);
    expect(map.get(1)).toBe(false);
    expect(map.size).toBe(2);
  });

  test("중복 키에 대해서 저장 잘 하는지", () => {
    const map = new MyMap();
    map.set(0, 2);
    map.set(0, false);
    expect(map.get(0)).toBe(false);
    expect(map.size).toBe(1);
  });

  test("없는 키에 접근할 경우 테스트", () => {
    const map = new MyMap();
    map.set(0, 2);
    map.set(1, 3);
    expect(map.get(2)).toBe(undefined);
    expect(map.get(5)).toBe(undefined);
  });

  test("키가 삭제 됐을 경우에 제대로 동작하는지 체크", () => {
    const map = new MyMap();
    map.set(0, 2);
    map.set(1, 3);
    map.delete(0);
    expect(map.get(0)).toBe(undefined);
    expect(map.size).toBe(1);
  });

  test("키가 삭제 됐을 다가 다시 해당 key에 값이 들어간 경우 제대로 동작하는지 체크", () => {
    const map = new MyMap();
    map.set(0, 2);
    map.set(1, 3);
    map.delete(0);
    map.set(0, 4);
    expect(map.get(0)).toBe(4);
    expect(map.size).toBe(2);
  });

  test("map 객체랑 똑같이 동작하는 지 확인해보자", () => {
    const myMap = new MyMap();
    const realMap = new Map();

    for (let i = 0; i < 1000; i++) {
      const key = createRandomInt(5);
      const key2 = createRandomInt(5);
      const value = createRandomInt(10);
      const value2 = createRandomInt(10);
      myMap.set(key, value);
      realMap.set(key, value);
      expect(myMap.get(key)).toBe(realMap.get(key));
      expect(myMap.size).toBe(realMap.size);
      myMap.delete(key2);
      realMap.delete(key2);
      myMap.set(key, value2);
      realMap.set(key, value2);
      expect(myMap.get(key2)).toBe(realMap.get(key2));
      expect(myMap.size).toBe(realMap.size);
    }
  });
});
