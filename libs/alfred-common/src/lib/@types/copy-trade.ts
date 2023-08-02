export interface CopyTradeCreateVaultPayload {
  name: string;
  symbol: string;
  chainId: number;
  totalAmount: number;
  walletAddress: string;
  v?: string;
  r?: string;
  s?: string;
  deadline?: string;
  maxInvestmentAmount: number;
  positionFactor: number;
  maxOpenPosition: number;
  followedAddresses: string[];
}

export interface VaultClosePositionsPayload {
  fundManagerProxy: string;
  chainId: number;
  walletAddress: string;
}

export interface VaultRedeemCopyTradeSharesPayload {
  redeemInUsdc: boolean;
  walletAddress: string;
  fundManagerProxy: string;
  chainId: number;
}

export interface VaultAddFundsPayload {
  fundManagerProxy: string;
  chainId: number;
  walletAddress: string;
  totalAmount: number;
  v?: string;
  r?: string;
  s?: string;
  deadline?: string;
}
