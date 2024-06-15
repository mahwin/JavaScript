import { Worker } from "worker_threads";

const msg = {
  시작: "start",
  일: "can you work?",
  일횟수: "몇 번 일 했어?",
  일시작: "start work",
};

const workers = [];

function addWorker() {
  const worker = new Worker(
    "/Users/jeong-youseock/Desktop/JavaScript/자바스크립트/WebWorker/job.js"
  );

  workers.push(worker);
}

function createWorker(worker, name) {
  worker.postMessage({ command: msg.시작, name });
  return worker;
}

function runWorker(worker, amount) {
  worker.postMessage({ command: msg.시작, amount });
}

function checkWorker(worker) {
  worker.postMessage({ command: msg.일 });
}

function addEventListenerWorker(worker) {
  worker.on("message", (message) => {
    console.log(message);
  });
}

const tasks = [1000, 1222, 1212, 1331, 1414];

(function () {
  addWorker();
  addWorker();
  addWorker();

  workers.forEach((worker, index) => {
    createWorker(worker, index);

    addEventListenerWorker(worker);
  });

  while (tasks.length) {
    for (const worker of workers) {
      if (checkWorker(worker)) {
        runWorker(worker, tasks.shift());
      }
    }
  }

  workers.forEach((worker) => {
    worker.postMessage({ command: msg.일횟수 });
  });
})();

while (tasks.length) {
  for (const worker of workers) {
    if (checkWorker(worker)) {
      console.log("??");
      runWorker(worker, tasks.shift());
    }
  }
}

workers.forEach((worker) => {
  worker.postMessage(createMsg(msg.일횟수));
});
