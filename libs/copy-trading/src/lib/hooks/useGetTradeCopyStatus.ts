import { useQuery } from '@tanstack/react-query';
import { TradeCopyStatusParams } from '../@types';
import getTradeCopyStatus from '../services/getTradeCopyStatus';

export default function useGetTradeCopyStatus(params: TradeCopyStatusParams) {
  return useQuery<boolean>(['getTradeCopyStatus', params], () => getTradeCopyStatus(params), {
    enabled: !!(params.walletAddress && params.traderAddress),
  });
}
