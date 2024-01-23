const fs = require("fs");

// 완전 무작위로 true나 false를 반환하는 함수
function random(threshold) {
  return Math.random() < threshold;
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

// 특정 함수의 메모리 사용량을 확인하는 함수
function measurePerformanceAndMemory({
  fn,
  properties,
  업데이트_또는_삭제_확률,
  프로퍼티_접근_확률,
}) {
  global.gc();
  const initialMemory = process.memoryUsage().heapUsed;
  const startTime = process.hrtime();

  fn({ properties, 업데이트_또는_삭제_확률, 프로퍼티_접근_확률 });

  const finalMemory = process.memoryUsage().heapUsed;
  const endTime = process.hrtime();

  const usedMemory = (finalMemory - initialMemory) / 1024 / 1024;
  const usedTime =
    (endTime[0] - startTime[0]) * 1000 + (endTime[1] - startTime[1]) / 1000000;
  return { usedTime, usedMemory };
}

function saveInfo(...arr) {
  const filePath = "./src/MapVsObject/result2.txt";
  try {
    // 파일이 존재할 때만 읽어오기
    if (fs.existsSync(filePath)) {
      fs.appendFileSync(filePath, `\n${arr.join(",")}`, "utf-8");
    } else {
      fs.writeFileSync(filePath, arr.join(","), "utf-8");
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

function testMap({ properties, 업데이트_또는_삭제_확률, 프로퍼티_접근_비율 }) {
  const map = new Map();
  for (let i = 0; i < properties.length; i++) {
    const key = properties[i];
    map.set(key, properties[i]);
    if (random(프로퍼티_접근_비율)) {
      const randomKey = properties[Math.floor(Math.random() * i)];
      map.get(randomKey);
    }
    if (random(업데이트_또는_삭제_확률)) {
      const randomKey = properties[Math.floor(Math.random() * i)];
      if (random(0.5)) {
        // 업데이트나 삭제를 무작위로 선택하기 위해 추가
        map.delete(randomKey);
      } else {
        map.set(randomKey, values[i]);
      }
    }
  }
}

function testObj({ properties, 업데이트_또는_삭제_확률, 프로퍼티_접근_비율 }) {
  const obj = {};
  for (let i = 0; i < properties.length; i++) {
    const key = properties[i];
    obj[key] = properties[i];

    if (random(프로퍼티_접근_비율)) {
      const randomKey = properties[Math.floor(Math.random() * i)];
      obj[randomKey];
    }
    if (random(업데이트_또는_삭제_확률)) {
      const randomKey = properties[Math.floor(Math.random() * i)];
      if (random(0.5)) {
        // 업데이트나 삭제를 무작위로 선택하기 위해 추가
        delete obj[randomKey];
      } else {
        obj[randomKey] = values[i];
      }
    }
  }
}

function shuffle(arr) {
  arr.sort(() => Math.random() - 0.5);
}

function test({
  프로퍼티_수,
  업데이트_또는_삭제_확률,
  프로퍼티_접근_확률,
  properties,
}) {
  shuffle(properties);

  const objResult = measurePerformanceAndMemory({
    fn: testMap,
    properties,
    업데이트_또는_삭제_확률,
    프로퍼티_접근_확률,
    프로퍼티_수,
  });
  const mapResult = measurePerformanceAndMemory({
    fn: testObj,
    properties,
    업데이트_또는_삭제_확률,
    프로퍼티_접근_확률,
    프로퍼티_수,
  });
  saveInfo(
    `Map,${프로퍼티_수},${업데이트_또는_삭제_확률},${업데이트_또는_삭제_확률},${mapResult.usedTime},${mapResult.usedMemory}\nObject,${프로퍼티_수},${업데이트_또는_삭제_확률},${업데이트_또는_삭제_확률},${objResult.usedTime},${objResult.usedMemory}`
  );
}

// let 6500000
function main() {
  const 십만 = 100_000;
  const 백만 = 1_000_000;
  const 천만 = 10_000_000;
  let properties = createProperties(백만);
  for (let 프로퍼티_수 = 십만; 프로퍼티_수 <= 천만; 프로퍼티_수 += 십만) {
    if (프로퍼티_수 !== 백만 && 프로퍼티_수 % 백만 === 0) {
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
        test({
          프로퍼티_수,
          업데이트_또는_삭제_확률,
          프로퍼티_접근_확률,
          properties,
        });
      }
    }
  }
}
main();
// test(1000000, 0.5, 0.5);
