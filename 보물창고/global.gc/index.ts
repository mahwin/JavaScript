function main() {
  for (let i = 0; i < 10; i++) {
    console.log(`실험 ${i + 1} 번째 결과입니다.`);

    if (typeof global.gc === "function") global.gc();

    const initialMemory = process.memoryUsage().heapUsed;
    const startTime = process.hrtime();
    heavyTask();
    const endMemory = process.memoryUsage().heapUsed;
    const endTime = process.hrtime();
    printResult(initialMemory, endMemory, startTime, endTime);
  }

  function heavyTask() {
    let cnt = BigInt(0);
    for (let i = 0; i < 100000000; i++) {
      cnt += BigInt(1);
    }
  }

  function getUsedMemory(startMemory: number, endMemory: number) {
    return (endMemory - startMemory) / 1024 / 1024;
  }

  function getUsedTime(startTime: [number, number], endTime: [number, number]) {
    return (
      (endTime[0] - startTime[0]) * 1_000 +
      (endTime[1] - startTime[1]) / 1_000_000
    );
  }
  function printResult(
    initialMemory: number,
    endMemory: number,
    startTime: [number, number],
    endTime: [number, number]
  ) {
    console.log(`메모리 사용량 : ${getUsedMemory(initialMemory, endMemory)}MB`);
    console.log(`걸린 시간은  : ${getUsedTime(startTime, endTime)}ms`);
    console.log("--------------");
  }
}
main();
