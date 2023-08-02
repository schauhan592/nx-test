import { useEffect, useState } from 'react';

interface Props {
  totalGivenItems?: any[];
  key: string | number;
  filterSets?: string | string[] | number | number[];
  returnItems?: number;
}
const useFilters = ({
  returnItems: returnGivenItems = 10,
  totalGivenItems,
  key,
  filterSets: givenFilterSets,
}: Props) => {
  const [totalItems, setTotalItems] = useState<typeof totalGivenItems>([]);
  const [filterKey, setFilterKey] = useState<number | string>('');
  const [returnItems, setReturnItems] = useState<number>(0);
  const [filteredData, setFilteredData] = useState<typeof totalGivenItems>([]);
  const [filterSets, setFilterSets] = useState<any[]>([]);

  useEffect(() => {
    setTotalItems([]);
    setTotalItems(
      totalGivenItems?.sort((a, b) => (a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0))
    );
    setFilterKey(key);
    setReturnItems(returnGivenItems);
    let arr = givenFilterSets
      ? Array.isArray(givenFilterSets)
        ? [...givenFilterSets]
        : [givenFilterSets]
      : [];

    setFilterSets(arr);
  }, []);

  useEffect(() => {
    setFilteredData([]);
    let filterArr: any = [];

    if (!filterSets) {
      filterArr = [];
    }
    if (filterSets && Array.isArray(filterSets)) {
      filterArr = filterSets;
    } else {
      filterArr = [filterSets];
    }
    if (filterArr.length) {
      const filtered = totalItems?.filter((item) => filterArr.includes(item[filterKey]));
      setFilteredData(filtered?.sort((a, b) => (a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0)));
    } else {
      setFilteredData(totalItems);
    }
  }, [filterSets, totalItems]);

  const handleFilter = (filter: string | string[] | number[] | number) => {
    let arr = filter ? (Array.isArray(filter) ? [...filter] : [filter]) : [];
    setFilterSets(arr);
  };

  const handleSetFilterData = (data: any[]) => {
    setTotalItems([]);
    setTotalItems(data?.sort((a, b) => (a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0)));
  };

  return {
    filterSets,
    filteredData,
    handleFilter,
    handleSetFilterData,
  };
};

export default useFilters;
