import { useQuery } from '@tanstack/react-query';
import { getProfile } from '../../services/authAPI';

export const useProfile = () => {
  const {
    data: profile,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    staleTime: 5 * 60 * 1000, // cache 5 phút
    retry: 1,
  });

  return { profile, isLoading, isError, reloadProfile: refetch };
};
