import { useMutation } from '@tanstack/react-query';
import tradeSettings from '../services/TradeSettting';

export default function useGetTradeSettings() {
  return useMutation(tradeSettings, { onSuccess: (data) => data });
}
