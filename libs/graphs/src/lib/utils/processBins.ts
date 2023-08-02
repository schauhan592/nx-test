import { AssetsDistributionTicks, Bin } from '@alfred/alfred-common';

export default function processData(
  ticks: AssetsDistributionTicks[],
  minTick: number,
  maxTick: number
): Bin[] {
  const bins: Bin[] = [];
  let liquidity = 0;
  for (let i = 0; i < ticks?.length - 1; ++i) {
    liquidity += Number(ticks[i].liquidityNet);

    const lowerTick = Number(ticks[i].tickIdx);
    const upperTick = Number(ticks[i + 1].tickIdx);

    if (upperTick > minTick && lowerTick < maxTick) {
      bins.push({
        x0: Number(ticks[i].tickIdx),
        x1: Number(ticks[i + 1].tickIdx),
        y: liquidity,
      });
    }
  }
  return bins;
}
