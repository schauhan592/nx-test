import { axiosInstance } from '@sdf/base';
import { GetAllGmxTxnPayload, TradeHistoryRes } from '../@types';

export default async function getAllGmxTxn(payload: GetAllGmxTxnPayload): Promise<TradeHistoryRes> {
  const res = await axiosInstance.post('/strategy/gmx/all-transactions', { ...payload });
  return res.data;
}
