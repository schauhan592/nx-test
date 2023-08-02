import { axiosInstance } from '@sdf/base';
import { FollowUnfollowTraderRequestPayload } from '../@types';

export default async function followTrader(payload: FollowUnfollowTraderRequestPayload) {
  return await axiosInstance.post('/fund-manage/follow-trader', { ...payload });
}
