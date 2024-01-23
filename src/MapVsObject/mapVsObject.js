const fs = require("fs");

// 완전 무작위로 true나 false를 반환하는 함수
function random(threshold) {
  return Math.random() < threshold;
}

// 무작위로 배열을 섞어주는 함수
function shuffle(arr) {
  arr.sort(() => Math.random() - 0.5);
}

// 정수를 알파벳으로 바꿔주는 함수
function intToString(number) {
  let result = [];
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  while (number > 0) {
    const remainder = (number - 1) % 26; // 1부터 26까지의 알파벳을 사용하기 위해 -1
    result.unshift(alphabet.charAt(remainder));
    number = Math.floor((number - 1) / 26);
  }

  return result.join("");
}

// 인수로 받은 함수를 실행하고 메모리 사용량과 걸린 시간을 측정하는 함수
function measurePerformanceAndMemory({ fn, parameters }) {
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

function saveInfo(saveInfo) {
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

function createProperties(프로퍼티_수) {
  let keys = new Set();
  while (keys.size !== 프로퍼티_수) {
    const randomKey = Math.floor(Number.MAX_SAFE_INTEGER * Math.random());
    if (random(0.5)) {
      keys.add(randomKey);
    } else {
      keys.add(intToString(randomKey));
    }
  }
  return [...keys];
}

const testFunctionObj = {
  map: function ({
    properties,
    업데이트_또는_삭제_확률,
    프로퍼티_접근_비율,
    프로퍼티_수,
  }) {
    const map = new Map();
    for (let i = 0; i < 프로퍼티_수; i++) {
      const key = properties[i];
      map.set(key, properties[i]);
      if (random(프로퍼티_접근_비율)) {
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
    프로퍼티_접근_비율,
    프로퍼티_수,
  }) {
    const obj = {};
    for (let i = 0; i < 프로퍼티_수; i++) {
      const key = properties[i];
      obj[key] = properties[i];

      if (random(프로퍼티_접근_비율)) {
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

function runTest(parameters) {
  return ["map", "object"].map((functionName) => {
    global.gc();
    return measurePerformanceAndMemory({
      fn: testFunctionObj[functionName],
      parameters,
    });
  });
}

function main() {
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
}
main();
