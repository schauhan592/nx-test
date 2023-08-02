import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@sdf/base';

export const getCorrelationData = async ({
  poolId,
  chainId,
}: {
  poolId: string;
  chainId: number;
}): Promise<{ points: { x: number; y: number }[]; xpery: string }> => {
  const resp = await axiosInstance.get(
    `/market/build/pool/price/correlation?poolId=${poolId}&chainId=${chainId}`
  );
  return resp.data;
};

export const useGetCorrelationData = (metadata: { poolId: string; chainId: number }) => {
  return useQuery(['getCorrelationData', metadata], () => getCorrelationData(metadata), {
    enabled: !!metadata.poolId,
  });
};
