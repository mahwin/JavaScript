function runGenerator(timer) {
  const gen = (function* generator() {
    yield 1;
    yield 1;
    yield 1;
    yield 1;
  })();

  let genIdx = 0;

  function nextIteration() {
    const result = gen.next();
    if (!result.done) {
      timer(`generator next : ${genIdx++} 번째 호출`);
      setTimeout(nextIteration, 1000);
    }
  }

  nextIteration();
}

function createTimerFunc() {
  const startTimestamp = new Date().getTime();
  return function (who) {
    console.log(
      `${who}\n시작 시간과의 차이는 : ${Math.floor(
        (new Date().getTime() - startTimestamp) / 1000
      )}s`
    );
  };
}

function heavyTask() {
  let cnt = BigInt(0);
  for (let i = 0; i < 200000000; i++) {
    cnt += BigInt(1);
  }
}

(function test() {
  let timer = createTimerFunc();
  console.log("---------------------------------");
  heavyTask();
  timer("heavyTask 단독 호출 시 걸리는 시간");
  console.log("---------------------------------");

  console.log("");

  timer = createTimerFunc();
  console.log("---------------------------------");
  console.log("1초 마다 제네레이터 next 호출하는 함수 실행 시작");
  runGenerator(timer);
  timer("heavyTask 실행");
  heavyTask();
  timer("heavyTask 끝");
  console.log("---------------------------------");
})();
