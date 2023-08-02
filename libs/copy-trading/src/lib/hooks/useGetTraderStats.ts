import { useQuery } from '@tanstack/react-query';
import getTraderStats from '../services/getTraderStats';
import { UserExternalStats } from '../@types';

export default function useGetTraderStats(users: string[]) {
  return useQuery<UserExternalStats>(
    ['getTraderStats', users],
    () => getTraderStats(users),
    {
      enabled: !!users.length,
    }
  );
}
