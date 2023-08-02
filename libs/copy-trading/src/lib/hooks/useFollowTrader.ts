import { useCallback, useEffect, useState } from 'react';
import { FollowUnfollowTraderRequestPayload } from '../@types';
import followTrader from '../services/followTrader';
import unfollowTrader from '../services/unfollowTrader';

export default function useFollowTrader(metadata: FollowUnfollowTraderRequestPayload) {
  const [isOK, setIsOk] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setLoading(false);
        setError(null);
        setIsOk(false);
      }, 3000);
    }
  }, [error]);

  const follow = useCallback(async () => {
    setLoading(true);
    try {
      const res = await followTrader(metadata);
      if (res.status === 200 || res.status === 201) {
        setIsOk(true);
        setLoading(false);
      } else {
        setIsOk(false);
        setError('Failed to fetch');
        setLoading(false);
      }
    } catch (e) {
      setIsOk(false);
      setError('Failed to fetch');
      setLoading(false);
    }
  }, [metadata]);
  const unfollow = useCallback(async () => {
    setLoading(true);

    try {
      const res = await unfollowTrader(metadata);
      if (res.status === 200 || res.status === 201) {
        setIsOk(true);
        setLoading(false);
      } else {
        setIsOk(false);
        setError('Failed to fetch');
        setLoading(false);
      }
      return res.data;
    } catch (e) {
      setIsOk(false);
      setError('Failed to fetch');
      setLoading(false);
    }
  }, [metadata]);

  return { isOK, error, loading, follow, unfollow };
}
