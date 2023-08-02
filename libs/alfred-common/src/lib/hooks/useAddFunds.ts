import { useMutation } from '@tanstack/react-query';
import addFunds from '../services/addFunds';

export default function useAddFunds() {
  return useMutation(addFunds, { onSuccess: (data) => data });
}
