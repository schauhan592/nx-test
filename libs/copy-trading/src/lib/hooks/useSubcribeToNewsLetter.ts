import { useMutation } from '@tanstack/react-query';
import { subscribeToNewsLetter } from '../services/subscribeToNewsLetter';

export default function useSubscribeToNewsLetter() {
  return useMutation(subscribeToNewsLetter, { onSuccess: (data) => data });
}
