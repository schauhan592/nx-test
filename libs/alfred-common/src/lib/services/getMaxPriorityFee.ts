import { axiosInstance } from '@sdf/base';
import { EstimateGas } from '../@types';

export const maxPriorityFee = async (
  chainId: number
): Promise<{ estimate?: EstimateGas; error?: any }> => {
  return new Promise((resolve) => {
    axiosInstance
      .get(`/market/max/priority/fee/per-gas-v2?chainId=${chainId}`)
      .then((resp) => {
        resolve({ estimate: resp?.data });
      })
      .catch((err) => resolve({ error: err }));
  });
};
