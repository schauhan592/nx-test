import { useQuery } from '@tanstack/react-query';
import { GavHistory } from '../@types';
import getGavHistoryData, { GetGavHistoryDataRequestPayload } from '../services/getGavHistoryData';

export default function useGetGavHistoryData(metadata: GetGavHistoryDataRequestPayload) {
  return useQuery<GavHistory[]>(
    ['getGavHistoryData', metadata],
    () => getGavHistoryData(metadata),
    {
      enabled: !!metadata?.users.length,
    }
  );
}
