import { useQuery } from '@tanstack/react-query';
import { StartegyDetailsParams, StrategyDetailsResponse } from '../@types';
import getStrategyDetails from '../services/getStrategyDetails';

export default function useGetStrategyDetails(params: StartegyDetailsParams) {
    return useQuery<StrategyDetailsResponse>(['getStrategyDetails', params], () => getStrategyDetails(params), {
        enabled: !!(params.fundManager && params.chainId),
        refetchInterval: params.isMounted ? 5000 : false
    });
}
