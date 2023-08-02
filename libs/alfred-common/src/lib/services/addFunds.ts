import { axiosInstance } from '@sdf/base';
import { VaultAddFundsPayload } from '../@types/copy-trade';

export default async function addFunds(payload: VaultAddFundsPayload) {
  const res = await axiosInstance.post('/fund-manage/add-funds', { ...payload });

  return res.data;
}
