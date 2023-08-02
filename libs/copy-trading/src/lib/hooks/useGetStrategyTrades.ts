import { axiosInstance } from '@sdf/base';
import { useMutation } from '@tanstack/react-query';

interface Payload {
  chainId: number;
  strategyId: string;
}

export async function getTrades(payload: Payload): Promise<any> {
  const res = await axiosInstance.post(`/strategy/gmx/transactions`, {
    ...payload,
  });

  return res.data;
}

export default function useGetTrades() {
  return useMutation(getTrades, { onSuccess: (data) => data });
}
