import { useQuery } from '@tanstack/react-query';
import { UserVaults } from '../@types';
import getTradeGav, { GetTotalGavRequestPayload } from '../services/getTradeGav';

export default function useGetTraderGav(metadata: GetTotalGavRequestPayload) {
  return useQuery<UserVaults, any>(['getUserGav', metadata], () => getTradeGav(metadata), {
    enabled: !!metadata?.users[0],
    refetchInterval: metadata?.isMounted ? 5000 : false,
  });
}
