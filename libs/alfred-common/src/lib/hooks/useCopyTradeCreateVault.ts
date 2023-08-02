import { useMutation } from '@tanstack/react-query';
import copyTradeCreateVault from '../services/copyTradeCreateVault';

export default function useCopyTradeCreateVault() {
  return useMutation(copyTradeCreateVault, { onSuccess: (data) => data });
}
