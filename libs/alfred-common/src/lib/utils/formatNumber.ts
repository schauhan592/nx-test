export function formatNumber(num: number) {
  let sign = 1;
  if (num < 0) {
    sign = -1;
  }
  num = Math.abs(num);
  let number = typeof num !== 'number' ? Number(num) : num;
  let unit = '';

  if (num >= 1000000000000) {
    number = num / 1000000000000;
    unit = 'T';
  } else if (num >= 1000000000) {
    number = num / 1000000000;
    unit = 'B';
  } else if (num >= 1000000) {
    number = num / 1000000;
    unit = 'M';
  } else if (num >= 1000) {
    number = num / 1000;
    unit = 'K';
  }

  return Number((sign * number).toFixed(2)) + unit;
}
