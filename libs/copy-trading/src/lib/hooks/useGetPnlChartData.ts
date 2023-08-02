import { useQuery } from '@tanstack/react-query';
import { PnlChartUnit } from '../@types';
import getPnlChartData, { PnlChartRequestProps } from '../services/getPnlChartData';

export default function useGetPnlChartData(metadata: PnlChartRequestProps) {
  return useQuery<PnlChartUnit[], any>(
    ['getPnlChartData', metadata],
    () => getPnlChartData(metadata),
    {
      enabled: !!metadata?.users?.length,
    }
  );
}
