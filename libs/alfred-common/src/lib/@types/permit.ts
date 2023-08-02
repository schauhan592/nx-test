import { ethers } from 'ethers';

export interface PermitTypes {
  spenderAddress: string;
  amount: number;
  chainId: number;
  walletAddress: string;
}

export interface DataTypes {
  domain: ethers.TypedDataDomain;
  types: Record<string, ethers.TypedDataField[]>;
  message: Record<string, any>;
}

export interface SignTypedDataResponse {
  data: DataTypes;
  sig: string;
  v: any;
  r: any;
  s: any;
}

export interface PermitData {
  v: string;
  r: string;
  s: string;
  deadline: string;
}
