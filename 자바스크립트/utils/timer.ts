export const timer = (name: string, fn: Function) => {
  console.time(name);
  fn();
  console.timeEnd(name);
};
