export const expandArray = (l: number, originData: Array<unknown>) => {
  const res = [];
  while (l--) {
    res.push(...originData);
  }
  return res;
};
