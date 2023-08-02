import { axiosInstance } from '@sdf/base';
import { StartegyDetailsParams, StrategyDetailsResponse } from '../@types';

export default async function getStrategyDetails(params: StartegyDetailsParams): Promise<StrategyDetailsResponse> {
    const res = await axiosInstance.get(
        `/strategy/details?strategyId=${params?.fundManager}&chainId=${params?.chainId}`
    );
    return res?.data;
}
