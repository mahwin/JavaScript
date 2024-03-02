import path from "path";

export default {
  entry: "./indexedDB/index.js", // 진입점(entry point) 설정
  output: {
    path: path.resolve(import.meta.dirname, "./indexedDB"), // 번들된 파일의 출력 경로 설정
    filename: "bundle.js", // 출력되는 번들 파일 이름 설정
  },
  mode: "production",
};
