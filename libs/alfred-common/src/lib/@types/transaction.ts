import { BigNumber } from 'ethers';

export interface TXN_TYPE {
  data: string;
  from: string;
  gasLimit: BigNumber | number;
  nonce: number;
  to: string;
  maxPriorityFeePerGas: number | BigNumber;
}

export type TxnSubStep = {
  id: number;
  label: string;
};

export type TxMode = 'slow' | 'medium' | 'fast';

export interface EstimateGas {
  slowEstimate: number;
  averageEstimate: number;
  fastEstimate: number;
}

export interface GasFee {
  slow: string;
  medium: string;
  fast: string;
}
