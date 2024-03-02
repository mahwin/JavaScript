import { minify } from "terser";

const whitespace = {
  origin: `function solution(a,b){
  const Arr = [1,2,3,4,5];
  return Arr.reduce((a,b)=>a+b,0);
}`,
  testcase: [
    `function solution( a, b ) {
      const Arr = [1,2,3,4,5];
      return Arr.reduce((a,b)=>a+b,0);
    }`,
    `function solution(a,b){
      const Arr = [1 ,2 ,3 ,       4,     5];
      return Arr.reduce((a,b)=>a+b,0);
    }`,
    `function solution(a,b){
      const  Arr  = [1,2,3,4,5];
      return  Arr.reduce(( a ,b)=> a + b, 0);
    }`,
  ],
};

const newLine = {
  origin: `function solution(a,b){
  const Arr = [1,2,3,4,5];
  return Arr.reduce((a,b)=>a+b,0);
}`,
  testcase: [
    `function solution( a, b ) 
    {
      const Arr = [1,2,3,4,5];
      return Arr.reduce((a,b)=>a+b,0);
    }`,
    `function solution(a,b){

      const Arr = [1,2,3 ,4,5];
      return Arr.reduce((a,b)=>a+b,0);
    }`,
    `function solution(a,b){
      const  Arr  = [1,2,3,4,5];
      return  Arr.reduce(( a ,b)=> a + b, 0);


    }`,
  ],
};

describe("whitespace가 있어도 같은 코드로 인식하는가", () => {
  let origin: string | undefined;
  test("파라메타에 의미없는 공백", async () => {
    origin = (await minify(whitespace.origin)).code;
    expect(origin).toBe((await minify(whitespace.testcase[0])).code);
  });
  test("객체에 의미없는 공백", async () => {
    expect(origin).toBe((await minify(whitespace.testcase[1])).code);
  });
  test("콜백함수에 의미없는 공백", async () => {
    expect(origin).toBe((await minify(whitespace.testcase[2])).code);
  });
});

describe("줄바꿈 있어도 같은 코드로 인식하는가", () => {
  let origin: string | undefined;
  test("중괄호에 의미없는 줄바꿈", async () => {
    origin = (await minify(newLine.origin)).code;
    expect(origin).toBe((await minify(newLine.testcase[0])).code);
  });
  test("의미없는 줄바꿈", async () => {
    expect(origin).toBe((await minify(newLine.testcase[1])).code);
  });
  test("return 이후에 의미없는 줄바꿈", async () => {
    expect(origin).toBe((await minify(newLine.testcase[2])).code);
  });
});

const combineNewlineAndWhitespace = {
  origin: `function solution(a,b){
    const Arr = [1,2,3,4,5];
    return Arr.reduce((a,b)=>a+b,0);
  }`,

  testcase: [
    `function solution(            a,               b)
    {
      const Arr = 
      [1,2,3,4,5];
      return Arr.reduce((a,b)=>a+b
      ,0)
      ;
    
    }`,
  ],
};

describe("newline과 whitespace 조합 ", () => {
  test("복잡합 조합", async () => {
    const origin = (await minify(combineNewlineAndWhitespace.origin)).code;
    expect(origin).toBe(
      (await minify(combineNewlineAndWhitespace.testcase[0])).code
    );
  });
});

const parametar = {
  origin: `function solution(num1,num2){
    return num1+num2;
  }
`,
  testcase: [
    `function solution(money1,money2){
      return money1+money2;
    }`,
  ],
};

describe("매개변수 ", () => {
  test("매개변수의 이름만 다르게 한다면 같은 코드로 평가할까", async () => {
    const origin = (await minify(parametar.origin)).code;
    expect(origin).toBe((await minify(parametar.testcase[0])).code);
  });
});

const func = {
  origin: `function parent(){}function son(){parent()}`,
};

describe("함수 이름", () => {
  test("함수 이름도 압축해줄까?", async () => {
    expect(func.origin).toBe((await minify(func.origin)).code);
  });
});
