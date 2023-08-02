import { axiosInstance } from '@sdf/base';
import { useMutation } from '@tanstack/react-query';
import { DeployStrategyTypes } from '../@types';

export const deployStrategy = async (metadata: DeployStrategyTypes) => {
  const resp = await axiosInstance.post(`/fund-manage/vaultcreationargs`, {
    ...metadata,
  });

  return resp.data;
};

export const useDeployStrategy = () => {
  return useMutation(deployStrategy, { onSuccess: (data) => data });
};
