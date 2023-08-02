import { useQuery } from '@tanstack/react-query';
import getTotalGav, { GetTotalGavRequestPayload } from '../services/getTotalGav';

export default function useGetTotalGav(metadata: GetTotalGavRequestPayload) {
  return useQuery<number>(['getTotalGav', metadata], () => getTotalGav(metadata), {
    enabled: !!metadata?.users.length,
  });
}
