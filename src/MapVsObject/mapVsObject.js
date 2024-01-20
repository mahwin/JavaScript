// 특정 함수의 메모리 사용량을 확인하는 함수
function measurePerformanceAndMemory(fn, ...property) {
  global.gc();
  const initialMemory = process.memoryUsage().heapUsed;
  const startTime = process.hrtime();
  fn(...property);

  const finalMemory = process.memoryUsage().heapUsed;
  const endTime = process.hrtime();

  const usedMemory = (finalMemory - initialMemory) / 1024 / 1024;
  const usedTime =
    (endTime[0] - startTime[0]) * 1000 + (endTime[1] - startTime[1]) / 1000000;
  console.log(`메모리 사용량: ${usedMemory} bytes`);
  console.log(`걸린 시간: ${usedTime} ms`);
}

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

function getKey(프로퍼티_수) {
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

function testMap(keys, values, 업데이트_또는_삭제_확률, 프로퍼티_접근_비율) {
  const map = new Map();
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    map.set(key, values[i]);
    if (random(프로퍼티_접근_비율)) {
      const randomKey = keys[Math.floor(Math.random() * i)];
      map.get(randomKey);
    }
    if (random(업데이트_또는_삭제_확률)) {
      const randomKey = keys[Math.floor(Math.random() * i)];
      if (random(0.5)) {
        // 업데이트나 삭제를 무작위로 선택하기 위해 추가
        map.delete(randomKey);
      } else {
        map.set(randomKey, values[i]);
      }
    }
  }
}

function testObj(keys, values, 업데이트_또는_삭제_확률, 프로퍼티_접근_비율) {
  const obj = {};
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    obj[key] = values[i];

    if (random(프로퍼티_접근_비율)) {
      const randomKey = keys[Math.floor(Math.random() * i)];
      obj[randomKey];
    }
    if (random(업데이트_또는_삭제_확률)) {
      const randomKey = keys[Math.floor(Math.random() * i)];
      if (random(0.5)) {
        // 업데이트나 삭제를 무작위로 선택하기 위해 추가
        delete obj[randomKey];
      } else {
        obj[randomKey] = values[i];
      }
    }
  }
}

function test(프로퍼티_수, 업데이트_또는_삭제_확률, 프로퍼티_접근_비율) {
  const keys = getKey(프로퍼티_수);
  const values = getKey(프로퍼티_수);
  measurePerformanceAndMemory(
    testMap,
    keys,
    values,
    업데이트_또는_삭제_확률,
    프로퍼티_접근_비율
  );
  measurePerformanceAndMemory(
    testObj,
    keys,
    values,
    업데이트_또는_삭제_확률,
    프로퍼티_접근_비율
  );
}

test(1000000, 0.5, 0.3);
