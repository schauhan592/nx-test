import { axiosInstance } from '@sdf/base';
import { FollowUnfollowTraderRequestPayload } from '../@types';

export default async function unfollowTrader(payload: FollowUnfollowTraderRequestPayload) {
  return await axiosInstance.post('/fund-manage/unfollow-trader', { ...payload });
}
