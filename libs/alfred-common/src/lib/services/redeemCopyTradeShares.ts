import { axiosInstance } from '@sdf/base';
import { VaultRedeemCopyTradeSharesPayload } from '../@types/copy-trade';

export default async function redeemTradeShares(payload: VaultRedeemCopyTradeSharesPayload) {
  const res = await axiosInstance.post('/fund-manage/redeem-copyTradeShares', { ...payload });

  return res.data;
}
