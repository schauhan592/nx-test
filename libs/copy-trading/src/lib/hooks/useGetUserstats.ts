import { useQuery } from '@tanstack/react-query';
import getUserStats from '../services/getUserStats';
import { UserStats } from '../@types';

export default function useGetUserStats(users: string[]) {
  return useQuery<UserStats>(['getUserStats', users], () => getUserStats(users), {
    enabled: !!users.length,
  });
}
