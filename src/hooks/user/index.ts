import useSWR from 'swr';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const USER_SECTION = `/api/user/section`;

export const useUserSection = () => {
  const router = useRouter();
  const { data, error } = useSWR(USER_SECTION);

  useEffect(() => {
    if (data && !data.ok) {
      router.replace('signin');
    }
  }, [data, router]);

  return { data, error, isLoading: !data && !error };
};
