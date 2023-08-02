import { axiosInstance } from '@sdf/base';
import { PermitTypes } from '../@types';

export const getPermit = async (metadata: PermitTypes) => {
  const resp = await axiosInstance.post(`/fund-manage/erc20-permit`, {
    ...metadata,
  });

  return resp.data;
};
