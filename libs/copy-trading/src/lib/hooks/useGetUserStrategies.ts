import { axiosInstance } from '@sdf/base';
import { useQuery } from '@tanstack/react-query';
import { CopiedStrategy } from '../@types';

export const GetUserStrategies = async ({
  walletAddress,
  chainId,
}: {
  walletAddress: string | null;
  chainId: number;
}): Promise<any> => {
  const resp = await axiosInstance.get(
    `/strategy/user-strategy?walletAddress=${walletAddress}&chainId=${chainId}`
  );
  return resp.data;
};

export const useGetUserStrategies = (metadata: {
  walletAddress: string | null;
  chainId: number;
  isMounted: boolean
}) => {
  return useQuery<CopiedStrategy[]>(
    ['GetUserStrategies', metadata],
    () => GetUserStrategies(metadata),
    {
      enabled: !!metadata.walletAddress,
      refetchInterval: metadata.isMounted ? 5000 : false
    }
  );
};
