import BigNumber from 'bignumber.js';

export const handlePriceLabel = (
  value: BigNumber | string | number,
  symbol = '',
  trimLength = 2
): string => {
  try {
    return Number(value) === 0
      ? `${symbol}0`.trim()
      : Number(value) <= 0.001
      ? `~ ${symbol}0.001`.trim()
      : Number(value) > 100000
      ? `~ ${symbol}100000...`.trim()
      : `${symbol} ${Number(value).toFixed(trimLength)}`.trim();
  } catch {
    return `${symbol}${value}`;
  }
};
