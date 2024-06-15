import { parentPort, workerData } from "worker_threads";

import Worker from "./worker.js";

const msg = {
  시작: "start",
  일: "can you work?",
  일횟수: "몇 번 일 했어?",
  일시작: "start work",
};

let worker;

parentPort.on("message", (message) => {
  if (message.command === msg.시작) {
    worker = new Worker(message.name);
    parentPort.postMessage(`${message.name} 생성 완료`);
  }

  if (message.command === msg.일) {
    const isRunning = worker.canWork();
    parentPort.postMessage(isRunning);
  }

  if (message.command === msg.일시작) {
    worker.run(message.amount);
  }

  if (message.command === msg.일횟수) {
    const done = worker.done;
    parentPort.postMessage(`${done}만큼의 작업을 수행했어요`);
  }
});
