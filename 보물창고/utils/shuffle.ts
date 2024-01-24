// 무작위로 배열을 섞어주는 함수
export function shuffle(arr: unknown[]) {
  arr.sort(() => Math.random() - 0.5);
}
