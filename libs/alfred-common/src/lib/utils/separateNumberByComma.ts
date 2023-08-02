export function separateNumberByComma(x: string, toFixed = 4) {
  return Number(x)
    .toFixed(toFixed)
    .toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
}
