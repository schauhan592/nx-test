import { axiosInstance } from '@sdf/base';
import { TradeCopyStatusParams } from '../@types';

export default async function getTradeCopyStatus(params: TradeCopyStatusParams): Promise<boolean> {
  const res = await axiosInstance.get(
    `/strategy/isfollowed?chainId=${params.chainId}&walletAddress=${params.walletAddress}&traderAddress=${params.traderAddress}`
  );
  return res?.data;
}
