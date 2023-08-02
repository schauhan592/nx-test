import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '@sdf/base';
import { AddMoreLiquidityTypes } from '../@types';

export const addMoreLiquidity = async (metadata: AddMoreLiquidityTypes) => {
  const resp = await axiosInstance.post(`/fund-manage/addmoreliquidityargs`, {
    ...metadata,
  });

  return resp.data;
};

export const useAddMoreLiquidity = () => {
  return useMutation(addMoreLiquidity, { onSuccess: (data) => data });
};
