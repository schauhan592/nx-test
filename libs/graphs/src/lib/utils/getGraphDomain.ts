export const LIQUIDITY_DENSITY_GAP_RATIO = 1;

export default function getGraphDomain(lowestHighestTicks: number[], currentTick: number) {
  const [lowestTick, highestTick] = lowestHighestTicks;
  const gap = highestTick - lowestTick;
  const ratio = (LIQUIDITY_DENSITY_GAP_RATIO / 100) * gap;

  return [currentTick - ratio, currentTick + ratio];
}
