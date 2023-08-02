import { Pool } from './pool';

export interface PositionSince {
  days: number;
  hours: number;
  minutes: number;
}

export interface StrategyReturns {
  currentInvested: number;
  currentInvestedUsdc: string;
  roi: string;
  totalAmountEarned: number;
  totalAmountEarnedUsdc: string;
  totalAmountInvested: number;
  totalAmountInvestedUsdc: string;
  totalAmountWithdrawn: number;
  totalAmountWithdrawnUsdc: string;
}
export interface Strategy {
  id: string;
  name: string;
  externalPositionAddress?: string[];
  volume24h: number;
  apy: string;
  tvl: number;
  pools: Pool[];
  withdraw?: boolean;
  balance?: string;
  category?: string;
  generated_fee_1yr: number;
  generated_fee_30d: number;
  fundManager: string;
  positionSince: PositionSince;
  returns: StrategyReturns;
}

export interface GeneratedFees {
  '1yr': number;
  '30d': number;
  '24h': number;
  '7d': number;
}

export interface DeployStrategyTypes {
  name: string;
  symbol: string;
  chainId: number;
  totalAmount: number;
  positionsData: PositionsData[];
  walletAddress: string;
  v?: string;
  r?: string;
  s?: string;
  deadline?: string;
}

export interface PositionsData {
  tokenAddress: string[];
  fee: number;
  protocol: string;
  amount: number;
  upperTick: number;
  lowerTick: number;
  poolAddress: string;
  minPrice: number;
  maxPrice: number;
}

export interface AddMoreLiquidityTypes {
  fundManagerProxy: string;
  name: string;
  chainId: number;
  totalAmount: number;
  walletAddress: string;
  v?: string;
  r?: string;
  s?: string;
  deadline?: string;
}

export interface CorrelationDataPoints {
  x: number;
  y: number;
}

export interface PnLDataPoints {
  x: number;
  y: number;
}
