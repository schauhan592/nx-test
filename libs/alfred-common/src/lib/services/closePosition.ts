import { axiosInstance } from '@sdf/base';
import { VaultClosePositionsPayload } from '../@types/copy-trade';

export default async function closePosition(payload: VaultClosePositionsPayload) {
  const res = await axiosInstance.post('/fund-manage/close-positions', { ...payload });

  return res.data;
}
