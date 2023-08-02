import { axiosInstance } from '@sdf/base';
import { TradeSettingsPayload } from '../@types';

export default async function tradeSettings(payload: TradeSettingsPayload) {
  return await axiosInstance.post('/fund-manage/trade-settings', { ...payload });
}
