import { useMutation } from '@tanstack/react-query';
import redeemTradeShares from '../services/redeemCopyTradeShares';

export default function useRedeemTradesShares() {
  return useMutation(redeemTradeShares, { onSuccess: (data) => data });
}
