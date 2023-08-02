export interface VaultRemoveLiquidityType {
  chainId: number;
  liquidityPercentage?: number;
  externalPositionProxy: string;
  walletAddress: string;
  inUsdc: boolean;
  fundManagerProxy: string;
}

export interface VaultRedeemSharesType {
  chainId: number;
  sharesquantity?: number;
  walletAddress: string;
  payoutAsset: string;
  vaultAddress: string;
}

export interface AddFundsType {
  fundManagerProxy: string;
  chainId: number;
  walletAddress: string;
  totalAmount: number;
  v?: string;
  r?: string;
  s?: string;
  deadline?: string;
}
