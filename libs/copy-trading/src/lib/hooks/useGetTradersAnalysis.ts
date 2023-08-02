import { useQuery } from '@tanstack/react-query';
import { ITrader } from '../@types';
import getTradersAnalysis, { GetTradingAnalysisPayload } from '../services/getTraderAnalysis';

export default function useGetTradersAnalysis(metadata: GetTradingAnalysisPayload) {
  return useQuery<ITrader, any>(
    ['getTradersAnalysis', metadata],
    () => getTradersAnalysis(metadata),
    {
      enabled: !!metadata?.users?.length,
    }
  );
}
