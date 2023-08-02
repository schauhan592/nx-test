import { CorrelationDataPoints } from './strategy';

export interface PoolToken {
  id: string;
  symbol: string;
  decimals?: string;
  decimal?: string;
  image?: string;
  address?: string;
  risk?: Risk;
}

export interface Token0 {
  id: string;
  symbol: string;
}

export interface Token1 {
  id: string;
  symbol: string;
}

export interface PoolTick {
  price0: string;
  price1: string;
}

export interface PoolDayData {
  date: number;
  volumeUSD: string;
}

export interface Card {
  title: string;
  title_tag_color: string;
  body_markdown: string;
}

export interface Risk {
  isRisk: boolean;
  title: string;
  title_tag_label: string;
  title_tag_color: string;
  cards: Card[];
}

export interface PoolTickData {
  upperTick: number;
  lowerTick: number;
  tickSpacing: number;
  currentTick: string;
  currentPrice: string;
  minPrice: string;
  maxPrice: string;
  x: string;
  y: string;
  lowestTick: string;
  highestTick: string;
  range: string;
  amount0Usdc: string;
  amount1Usdc: string;
  amount0: number;
  amount1: number;
  unitChange: number;
  lowestPrice: string;
  highestPrice: string;
}

export interface Returns {
  '24H': number;
  '7D': number;
  '1Y': number;
  '30D': number;
}

export interface AssetsDistributionTicks {
  tickIdx: string;
  liquidityNet: string;
  price0: string;
  price1: string;
  pool?: {
    tick: string;
  };
}

export interface Bin {
  x0: number;
  x1: number;
  y: number;
}

export interface AssetsDistributionDetails {
  ticks: AssetsDistributionTicks[];
  currentTick: string;
  bins: Bin[];
}

export interface Pool {
  id: string;
  localUuid?: string;
  updated_at: number;
  updated_at_formatted: string;
  createdAtTimestamp: string;
  feeTier: string;
  liquidity: string;
  token0: Token0;
  token1: Token1;
  ticks: PoolTick[];
  tick: string;
  totalValueLockedUSDC: string;
  totalValueLockedToken0: string;
  totalValueLockedToken1: string;
  txCount: string;
  poolDayData: PoolDayData[];
  category: string;
  token: PoolToken[];
  roi: string;
  returns: Returns;
  totalValueLockedUSDC_formatted: string;
  totalValueLockedToken0_formatted: string;
  totalValueLockedToken1_formatted: string;
  feeTier_formatted: string;
  generatedFee30d: number;
  generatedFee1yr: number;
  tickData: PoolTickData;
  protocol: string;
  assetsDistribution?: AssetsDistributionDetails;
  volume24h: number;
  nftId?: string;
  correlationData?: {
    points: CorrelationDataPoints[];
    xpery: string;
  };
}
