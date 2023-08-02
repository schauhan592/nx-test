import { useQuery } from '@tanstack/react-query';
import getAllTradersRanking from '../services/getAllTradersRanking';
import { ITrader } from '../@types';

export default function useGetAllTradersRanking() {
  return useQuery<ITrader[], any>(['getAllTradersRanking'], () => getAllTradersRanking());
}
