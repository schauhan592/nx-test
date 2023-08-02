import { axiosInstance } from '@sdf/base';
import { useMutation } from '@tanstack/react-query';
import { VaultRedeemSharesType } from '../@types';

export const vaultRedeemSharesType = async (metadata: VaultRedeemSharesType) => {
  const resp = await axiosInstance.post(`/fund-manage/redeem-shares`, {
    ...metadata,
  });

  return resp.data;
};

export const useVaultRedeemSharesType = () => {
  return useMutation(vaultRedeemSharesType, { onSuccess: (data) => data, retry: 10 });
};
