import { axiosInstance } from '@sdf/base';
import { useMutation } from '@tanstack/react-query';
import { VaultRemoveLiquidityType } from '../@types';

export const vaultRemoveLiquidityType = async (metadata: VaultRemoveLiquidityType) => {
  const resp = await axiosInstance.post(`/fund-manage/remove-liquidity`, {
    ...metadata,
  });

  return resp.data;
};

export const useVaultRemoveLiquidityType = () => {
  return useMutation(vaultRemoveLiquidityType, { onSuccess: (data) => data, retry: 10 });
};
