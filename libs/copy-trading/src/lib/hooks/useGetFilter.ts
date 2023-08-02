interface FilterProps {
  data: any;
  column: string;
  min?: number;
  max?: number;
  time?: '7D' | '15D' | '30D';
  sort?: 'asc' | 'desc';
}
function sortData(sort: any, column: string, filteredData: any) {
  return filteredData.sort((a: any, b: any) => {
    return sort === 'desc' ? b[column] - a[column] : a[column] - b[column];
  });
}
function getFilteredData(props: FilterProps): any[] {
  const { data, min, max, column, time, sort } = props;

  let filteredData = data.filter((val: any) => {
    if (min && Number(val[column]) <= min) {
      return false;
    }
    if (max && Number(val[column]) >= max) {
      return false;
    }
    if (time) {
      const timeMap = {
        '7D': 7,
        '15D': 15,
        '30D': 30,
      };
      const currentDate = new Date();
      const startDate = new Date(currentDate.getTime() - timeMap[time] * 24 * 60 * 60 * 1000);
      const date = new Date(val[column]);
      if (date < startDate || date > currentDate) {
        return false;
      }
    }
    return true;
  });

  if (sort) {
    filteredData = sortData(sort, column, filteredData);
  }

  return filteredData;
}

export default getFilteredData;
