// 정수를 알파벳으로 바꿔주는 함수
export function intToString(number: number) {
  let result = [];
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  while (number > 0) {
    const remainder = (number - 1) % 26; // 1부터 26까지의 알파벳을 사용하기 위해 -1
    result.unshift(alphabet.charAt(remainder));
    number = Math.floor((number - 1) / 26);
  }

  return result.join("");
}
