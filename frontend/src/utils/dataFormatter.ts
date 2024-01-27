type Data = {
  name: string;
  propertyNum: string;
  updateOrDeleteRatial: string;
  accessRatial: string;
  time: string;
  memory: string;
};

export function dataFormatter(type: string, target: string, data: Data[]) {
  if (type.toLowerCase() === "scatter") {
    return data.map((el) => {
      return {
        x: el.propertyNum,
        y: el[target as keyof Data],
      };
    });
  }
  if (type.toLowerCase() === "line") {
    return data.map((el) => {
      return {
        x: el.propertyNum,
        y: el[target as keyof Data],
      };
    });
  }
}
