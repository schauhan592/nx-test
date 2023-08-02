export const getUniqueItems = (props: any) => {
  const { data } = props;
  const uniqueIds = new Set();
  const unique = data.filter((element: any) => {
    const isDuplicate = uniqueIds.has(element.id);

    uniqueIds.add(element.id);
    if (!isDuplicate) {
      return true;
    }
    return false;
  });

  return unique;
};
