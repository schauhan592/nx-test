import { useQuery } from '@tanstack/react-query';
import { UserVaults } from '../@types';
import getUserGav, { UserGavRequestProps } from '../services/getUserGav';

export default function useGetUserGav(metadata: UserGavRequestProps) {
  return useQuery<UserVaults, any>(['getUserGav', metadata], () => getUserGav(metadata), {
    enabled: !!metadata?.users[0],
  });
}
