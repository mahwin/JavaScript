export const expandArray = <T>(l: number, originData: Array<T>) => {
  const res = [];
  while (l--) {
    res.push(...originData);
  }
  return res;
};
