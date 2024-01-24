import fs from "fs";
import { random, intToString, shuffle } from "../utils";

type PropertyType = keyof any;
type TestFn = (parameters: ParameterType) => void;

interface ParameterType {
  properties: PropertyType[];
  업데이트_또는_삭제_확률: number;
  프로퍼티_접근_확률: number;
  프로퍼티_수: number;
}

// 인수로 받은 함수를 실행하고 메모리 사용량과 걸린 시간을 측정하는 함수
function measurePerformanceAndMemory({
  fn,
  parameters,
}: {
  fn: TestFn;
  parameters: ParameterType;
}) {
  const initialMemory = process.memoryUsage().heapUsed;
  const startTime = process.hrtime();

  fn(parameters);

  const finalMemory = process.memoryUsage().heapUsed;
  const endTime = process.hrtime();

  const usedMemory = (finalMemory - initialMemory) / 1024 / 1024;
  const usedTime =
    (endTime[0] - startTime[0]) * 1000 + (endTime[1] - startTime[1]) / 1000000;
  return { usedTime, usedMemory };
}

function saveInfo(saveInfo: string) {
  const filePath = "./src/MapVsObject/result4.txt";
  try {
    if (fs.existsSync(filePath)) {
      fs.appendFileSync(filePath, saveInfo, "utf-8");
    } else {
      fs.writeFileSync(filePath, saveInfo, "utf-8");
    }
  } catch (error) {
    console.error("파일 읽기 오류:", error);
  }
}

function createProperties(프로퍼티_수: number) {
  let keys = new Set();
  while (keys.size !== 프로퍼티_수) {
    const randomKey = Math.floor(Number.MAX_SAFE_INTEGER * Math.random());
    if (random(0.5)) {
      keys.add(randomKey);
    } else {
      keys.add(intToString(randomKey));
    }
  }
  return [...keys] as PropertyType[];
}

const testFunctionObj = {
  map: function ({
    properties,
    업데이트_또는_삭제_확률,
    프로퍼티_접근_확률,
    프로퍼티_수,
  }: ParameterType) {
    const map = new Map();
    for (let i = 0; i < 프로퍼티_수; i++) {
      const key = properties[i];
      map.set(key, properties[i]);
      if (random(프로퍼티_접근_확률)) {
        const randomKey = properties[Math.floor(Math.random() * i)];
        map.get(randomKey);
      }
      if (random(업데이트_또는_삭제_확률)) {
        const randomKey = properties[Math.floor(Math.random() * i)];
        if (random(0.5)) {
          map.delete(randomKey);
        } else {
          map.set(randomKey, properties[i]);
        }
      }
    }
  },
  object: function ({
    properties,
    업데이트_또는_삭제_확률,
    프로퍼티_접근_확률,
    프로퍼티_수,
  }: ParameterType) {
    const obj = {} as Record<PropertyType, unknown>;

    for (let i = 0; i < 프로퍼티_수; i++) {
      const key = properties[i];
      obj[key] = properties[i];

      if (random(프로퍼티_접근_확률)) {
        const randomKey = properties[Math.floor(Math.random() * i)];
        obj[randomKey];
      }
      if (random(업데이트_또는_삭제_확률)) {
        const randomKey = properties[Math.floor(Math.random() * i)];
        if (random(0.5)) {
          delete obj[randomKey];
        } else {
          obj[randomKey] = properties[i];
        }
      }
    }
  },
};

function runTest(parameters: ParameterType) {
  return ["map", "object"].map((functionName) => {
    if (typeof global.gc === "function") {
      global.gc();
    }
    return measurePerformanceAndMemory({
      fn: testFunctionObj[functionName as "map" | "object"],
      parameters,
    });
  });
}

(function main() {
  const 십만 = 100_000;
  const 백만 = 1_000_000;
  const 천만 = 10_000_000;
  let properties = createProperties(백만);
  for (let 프로퍼티_수 = 십만; 프로퍼티_수 <= 천만; 프로퍼티_수 += 십만) {
    if (프로퍼티_수 % 백만 === 0) {
      properties = properties.concat(createProperties(백만));
    }
    for (
      let 업데이트_또는_삭제_확률 = 0;
      업데이트_또는_삭제_확률 <= 1;
      업데이트_또는_삭제_확률 += 0.1
    ) {
      for (
        let 프로퍼티_접근_확률 = 0;
        프로퍼티_접근_확률 <= 1;
        프로퍼티_접근_확률 += 0.1
      ) {
        shuffle(properties);

        const testResult = runTest({
          프로퍼티_수,
          업데이트_또는_삭제_확률,
          프로퍼티_접근_확률,
          properties,
        });
        const [mapResult, objResult] = testResult;
        saveInfo(
          `Map,${프로퍼티_수},${업데이트_또는_삭제_확률},${프로퍼티_접근_확률},${mapResult.usedTime},${mapResult.usedMemory}\nObject,${프로퍼티_수},${업데이트_또는_삭제_확률},${프로퍼티_접근_확률},${objResult.usedTime},${objResult.usedMemory}\n`
        );
      }
    }
  }
})();
