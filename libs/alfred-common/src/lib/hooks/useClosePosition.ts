import { useMutation } from '@tanstack/react-query';
import closePosition from '../services/closePosition';

export default function useClosePosition() {
  return useMutation(closePosition, { onSuccess: (data) => data });
}
