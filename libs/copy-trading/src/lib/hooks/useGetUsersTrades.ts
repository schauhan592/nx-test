import { useQuery } from '@tanstack/react-query';
import getUserTrades, { UserTradesRequestProps } from '../services/getUserTrades';
import { UserTrades } from '../@types';

export default function useGetUsersTrades(metadata: UserTradesRequestProps) {
  return useQuery<UserTrades, any>(['getUserTrades', metadata], () => getUserTrades(metadata), {
    enabled: !!metadata?.users[0],
  });
}
