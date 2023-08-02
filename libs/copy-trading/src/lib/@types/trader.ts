import { PermitData } from '@alfred/alfred-common';
import { Dispatch, SetStateAction } from 'react';

export interface ITrader {
  'gmx_top_traders_analytics.account': string;
  'gmx_top_traders_analytics.total_trades': string;
  'gmx_top_traders_analytics.one_month_trades': string;
  'gmx_top_traders_analytics.total_pnl_till_date': string;
  'gmx_top_traders_analytics.one_month_pnl_usd': string;
  'gmx_top_traders_analytics.total_volume_till_date': string;
  'gmx_top_traders_analytics.one_month_volume_usd': string;
  'gmx_top_traders_analytics.one_month_Pnl_percentage': string;
  'gmx_top_traders_analytics.total_pnl_percentage': string;
  'gmx_top_traders_analytics.profitable_trades': string;
  'gmx_top_traders_analytics.winning_percentage': string;
}

export interface ITraderWithRank extends ITrader {
  rank: number;
}

export interface PnlChartUnit {
  'gmx_traders_equity.account': string;
  'gmx_traders_equity.time': string;
  'gmx_traders_equity.pnl_usd': string;
  'gmx_traders_equity.pnl_perct': string;
}

export interface FollowUnfollowTraderRequestPayload {
  followingTrader: string;
  walletAddress: string;
  fundManagerProxy: string;
  chainId: number;
}
export interface TradeSettingsPayload {
  chainId: number;
  walletAddress: string;
  maxOpenPositions: number;
  tradeFactor: number;
  fundManagerProxy: string;
}

export interface UserTrade {
  'gmx_trader_trades.account': string;
  'gmx_trader_trades.volume_usd': string;
  'gmx_trader_trades.pnl_usd': string;
  'gmx_trader_trades.token': string;
  'gmx_trader_trades.status': 'OPEN' | 'CLOSE';
  'gmx_trader_trades.position_side': 'SHORT' | 'LONG';
  'gmx_trader_trades.evt_block_time': string;
  'gmx_trader_trades.txn_hash': string;
  'gmx_trader_trades.collateral': string;
  'gmx_trader_trades.events': string;
  'gmx_trader_trades.leverage': string;
  'gmx_trader_trades.average_price_usd': string;
  'gmx_trader_trades.price_usd': string;
  'gmx_trader_trades.fee_usd': string;
}
export interface UserVault {
  'gmx_trader_vaults_gav.time': string;
  'gmx_trader_vaults_gav.account': string;
  'gmx_trader_vaults_gav.vault_address': string;
  'gmx_trader_vaults_gav.external_position': string;
  'gmx_trader_vaults_gav.gav': string;
}

export type UserTrades = UserTrade[];
export type UserVaults = UserVault[];

export interface CopyTradingContextValues {
  isModalOpen: boolean;
  isCustomAddressModalOpen: boolean;
  setIsCustomAddressModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  openTxnBuilder: boolean;
  setOpenTxnBuilder: Dispatch<SetStateAction<boolean>>;
  copyTradePermitData: PermitData | undefined;
  setCopyTradePermitData: Dispatch<SetStateAction<PermitData | undefined>>;
  tradeConfig: CopyTradeConfig | undefined;
  setTradeConfig: Dispatch<SetStateAction<CopyTradeConfig | undefined>>;
  traderAddress: string | undefined;
  setTraderAddress: Dispatch<SetStateAction<string | undefined>>;
}

export interface CopyTradingFormValues {
  maxInventment: number;
  positionFactor: number;
  maxOpenPosition: number;
  tnc: boolean;
}

export interface CopyTradeConfig extends CopyTradingFormValues {
  followedAddress: string[];
}

export interface CopiedStrategy {
  id: string;
  name: string;
  fundManager: string;
  symbol: string;
  externalPositionAddress: any[];
  balance: string;
  followedTrader: string;
  deposited: number;
  pnl: number;
  since: number;
}

export interface GetAllGmxTxnPayload {
  chainId: number;
  walletAddress: string;
}

export interface TradePositionHistory {
  id: string;
  key: string;
  account: string;
  collateralToken: string;
  indexToken: string;
  collateralDelta: string;
  sizeDelta: string;
  isLong: boolean;
  price: string;
  fee: string;
  transaction: TradeTransaction;
  logIndex: number;
  timestamp: number;
}

export interface TradeTransaction {
  id: string;
  timestamp: number;
}

export interface TradeHistoryRes {
  liquidatePositions: TradePositionHistory[];
  decreasePositions: TradePositionHistory[];
  increasePositions: TradePositionHistory[];
}

export interface TradeCopyStatusParams {
  walletAddress: string | null;
  traderAddress: string | null;
  chainId: number;
}

export interface StartegyDetailsParams {
  fundManager: string;
  chainId: number;
  isMounted: boolean;
}

export interface StrategyDetailsResponse {
  id: string;
  name: string;
  fundManager: string;
  symbol: string;
  externalPositionAddress: any;
  balance: string;
  gav: string;
  deposited: string;
  walletAddress: string;
  pnl: string;
  since: string;
  followedTrader: string;
  wethBalanceInUsdc: string;
  usdcBalance: string;
  wethBalance: string;
}
export interface UserStats {
  'copy_traders_analytics.account': string;
  'copy_traders_analytics.external_position': string;
  'copy_traders_analytics.profitable_trades': string;
  'copy_traders_analytics.one_month_volume_usd': string;
  'copy_traders_analytics.total_pnl_percentage': string;
  'copy_traders_analytics.one_month_pnl_usd': string;
  'copy_traders_analytics.total_pnl_till_date': string;
  'copy_traders_analytics.total_volume_till_date': string;
  'copy_traders_analytics.one_month_Pnl_percentage': string;
  'copy_traders_analytics.total_trades': string;
  'copy_traders_analytics.one_month_trades': string;
  'copy_traders_analytics.winning_percentage': string;
}
export interface UserExternalStats {
  'copy_traders_analytics.account'?: string;
  'copy_traders_analytics.external_position'?: string;
  'copy_traders_analytics.profitable_trades'?: string;
  'copy_traders_analytics.one_month_volume_usd'?: string;
  'copy_traders_analytics.total_pnl_percentage'?: string;
  'copy_traders_analytics.one_month_pnl_usd'?: string;
  'copy_traders_analytics.total_pnl_till_date'?: string;
  'copy_traders_analytics.total_volume_till_date'?: string;
  'copy_traders_analytics.one_month_Pnl_percentage'?: string;
  'copy_traders_analytics.total_trades'?: string;
  'copy_traders_analytics.one_month_trades'?: string;
  'copy_traders_analytics.winning_percentage'?: string;
  'trade_analytics.account'?: string;
  'trade_analytics.external_position'?: string;
  'trade_analytics.profitable_trades'?: string;
  'trade_analytics.one_month_volume_usd'?: string;
  'trade_analytics.total_pnl_percentage'?: string;
  'trade_analytics.one_month_pnl_usd'?: string;
  'trade_analytics.total_pnl_till_date'?: string;
  'trade_analytics.total_volume_till_date'?: string;
  'trade_analytics.one_month_Pnl_percentage'?: string;
  'trade_analytics.total_trades'?: string;
  'trade_analytics.one_month_trades'?: string;
  'trade_analytics.winning_percentage'?: string;
}

export interface GavHistory {
  'gmx_trader_gav_data.account': string;
  'gmx_trader_gav_data.gav': string;
  'gmx_trader_gav_data.time': string;
}

export interface UnfollowTradeResponse {
  data: string;
  to: string;
  nonce: number;
  gaslimit: {
    type: string;
    hex: string;
  };
  from: string;
  maxPriorityFeePerGas: {
    type: string;
    hex: string;
  };
}

export interface AddFundsFormValues {
  amount: number;
}
