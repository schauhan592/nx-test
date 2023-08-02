import { useMutation } from '@tanstack/react-query';
import getAllGmxTxn from '../services/getAllGmxTxns';

export default function useGetAllGmxTxn() {
  return useMutation(getAllGmxTxn, { onSuccess: (data) => data });
}
