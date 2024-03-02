import fs from "fs";

// function main(oldPath, newPath) {
//   const data = fs.readFileSync(oldPath, "utf8");
//   const newData = data.split("\n").map((line) => {
//     let [a, b, c, d, e, f] = line.split(",");
//     c = (Math.round(Number(c) * 10) / 10).toString();
//     d = (Math.round(Number(d) * 10) / 10).toString();
//     e = Number(e).toFixed(2).toString();
//     f = Number(f).toFixed(2).toString();
//     return [a, b, c, d, e, f].join(",");
//   });
//   fs.writeFileSync(newPath, newData.join("\n"), "utf8");
// }

// function findBoundary(path) {
//   const data = fs.readFileSync(path, "utf8");
//   let [minTime, maxTime, minMemory, maxMemory] = [Infinity, 0, Infinity, 0];
//   data.split("\n").forEach((line) => {
//     const splitArr = line.split(",");
//     const time = splitArr[4];
//     const memory = splitArr[5];
//     if (Number(time) < minTime) minTime = Number(time);
//     if (Number(time) > maxTime) maxTime = Number(time);
//     if (Number(memory) < minMemory) minMemory = Number(memory);
//     if (Number(memory) > maxMemory) maxMemory = Number(memory);
//   });
//   return { minTime, maxTime, minMemory, maxMemory };
// }

// function divider(path) {
//   const data = fs.readFileSync(path, "utf8");
//   let objArr = [];
//   let mapArr = [];
//   data.split("\n").forEach((line) => {
//     const functionName = line.split(",")[0];
//     if (functionName === "Object") objArr.push(line);
//     if (functionName === "Map") mapArr.push(line);
//   });
//   fs.writeFileSync(
//     "/Users/jeong-youseock/Desktop/JavaScript/보물창고/MapVsObject/objectResult.txt",
//     objArr.join("\n"),
//     "utf8"
//   );
//   fs.writeFileSync(
//     "/Users/jeong-youseock/Desktop/JavaScript/보물창고/MapVsObject/mapResult.txt",
//     mapArr.join("\n"),
//     "utf8"
//   );
// }

// main(
//   "/Users/jeong-youseock/Desktop/JavaScript/보물창고/MapVsObject/mapResult.csv",
//   "/Users/jeong-youseock/Desktop/JavaScript/보물창고/MapVsObject/compressedMapResult.csv"
// );
// function main(path, savePath) {
//   const data = fs.readFileSync(path, "utf8");
//   let pre = 100000;
//   let accTime = [];
//   let accMemory = [];
//   const result = [`name,propertyNum,time,memory`];

//   data.split("\n").forEach((line, i) => {
//     if (i !== 0) {
//       const [a, b, c, d, e, f] = line.split(",");
//       if (pre !== Number(b)) {
//         accTime.sort((a, b) => a - b);
//         accMemory.sort((a, b) => a - b);
//         accTime = accTime.slice(2, accTime.length - 2);
//         accMemory = accMemory.slice(2, accMemory.length - 2);
//         let time = accTime.reduce((acc, cur) => acc + cur, 0) / accTime.length;
//         let memory =
//           accMemory.reduce((acc, cur) => acc + cur, 0) / accMemory.length;

//         time = Number(time).toFixed(2).toString();
//         memory = Number(memory).toFixed(2).toString();
//         result.push([a, pre, time, memory].join(","));
//         accTime = [];
//         accMemory = [];
//         pre = Number(b);
//       }
//       accTime.push(Number(e));
//       accMemory.push(Number(f));
//     }
//   });
//   fs.writeFileSync(savePath, result.join("\n"), "utf8");
// }

const pathMap =
  "/Users/jeong-youseock/Desktop/JavaScript/보물창고/MapVsObject/mapResult.csv";
const pathObj =
  "/Users/jeong-youseock/Desktop/JavaScript/보물창고/MapVsObject/objectResult.csv";
function main(path, path2) {
  const mapData = fs.readFileSync(path, "utf8").split("\n");
  const objData = fs.readFileSync(path2, "utf8").split("\n");
  const Map = {};
  const tmp = {};
  for (let i = 100000; i < 7000000; i += 100000) {
    Map[i] = { updateOrDeleteRatial: {}, accessRatial: {} };
    tmp[i] = { updateOrDeleteRatial: {}, accessRatial: {} };
    for (const ratial of [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]) {
      Map[i]["updateOrDeleteRatial"][ratial] = { time: [], memory: [] };
      Map[i]["accessRatial"][ratial] = { time: [], memory: [] };
    }
  }
  const result = {
    Map: JSON.parse(JSON.stringify(Map)),
    Object: JSON.parse(JSON.stringify(Map)),
  };
  for (let i = 1; i < mapData.length; i++) {
    // 함수, 프로퍼티, 업데이트, 접근, 시간, 메모리
    const [a, b, c, d, e, f] = mapData[i].split(",");
    if (Number(b) === 7000000) break;
    Map[b]["updateOrDeleteRatial"][c]["memory"].push(+f);
    Map[b]["updateOrDeleteRatial"][c]["time"].push(+e);
    Map[b]["accessRatial"][d]["memory"].push(+f);
    Map[b]["accessRatial"][d]["time"].push(+e);
  }
  for (let i = 100000; i < 7000000; i += 100000) {
    for (const ratial of [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]) {
      for (const type of ["updateOrDeleteRatial", "accessRatial"]) {
        const { time, memory } = Map[i][type][ratial];
        time.sort((a, b) => a - b);
        memory.sort((a, b) => a - b);
        const arrTime = time.slice(1, time.length - 1);
        const arrMemory = memory.slice(1, memory.length - 1);

        result["Map"][i][type][ratial]["time"].push(
          arrTime.map((t) => ({ x }))
        );
        result["Map"][i][type][ratial]["memory"].push({
          x: ratial,
          y: arrTime,
        });
      }
    }
  }

  const Object = {};
  for (let i = 100000; i < 7000000; i += 100000) {
    Object[i] = { updateOrDeleteRatial: {}, accessRatial: {} };
    for (const ratial of [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]) {
      Object[i]["updateOrDeleteRatial"][ratial] = { time: [], memory: [] };
      Object[i]["accessRatial"][ratial] = { time: [], memory: [] };
    }
  }

  for (let i = 1; i < objData.length; i++) {
    // 함수, 프로퍼티, 업데이트, 접근, 시간, 메모리
    const [a, b, c, d, e, f] = objData[i].split(",");
    if (Number(b) === 7000000) break;
    Object[b]["updateOrDeleteRatial"][c]["memory"].push(+f);
    Object[b]["updateOrDeleteRatial"][c]["time"].push(+e);
    Object[b]["accessRatial"][d]["memory"].push(+f);
    Object[b]["accessRatial"][d]["time"].push(+e);
  }
  for (let i = 100000; i < 7000000; i += 100000) {
    for (const ratial of [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]) {
      for (const type of ["updateOrDeleteRatial", "accessRatial"]) {
        const { time, memory } = Object[i][type][ratial];
        time.sort((a, b) => a - b);
        memory.sort((a, b) => a - b);
        const arrTime = time.slice(1, time.length - 1);
        const arrMemory = memory.slice(1, memory.length - 1);
        const avgTime = (
          arrTime.reduce((acc, cur) => acc + cur, 0) / time.length
        ).toFixed(2);
        const avgMemory = (
          arrMemory.reduce((acc, cur) => acc + cur, 0) / time.length
        ).toFixed(2);
        Object[i][type][ratial].time = avgTime;
        Object[i][type][ratial].memory = avgMemory;
        result["Object"][i][type].time.y.push(avgTime);
      }
    }
  }

  fs.writeFileSync(
    "/Users/jeong-youseock/Desktop/JavaScript/보물창고/MapVsObject/result2D.json",
    JSON.stringify(result),
    "utf8"
  );
}

main(pathMap, pathObj);
