import useSWR from 'swr';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const USER_SECTION = `/api/user/section`;

export const useUserSection = () => {
  const router = useRouter();
  const { data, error } = useSWR(USER_SECTION);

  useEffect(() => {
    console.log(1, data);
    if (data && (!data.ok || !data.userId)) {
      router.replace('/user/login');
    }
  }, [data, router]);

  return { data: data?.session, error, isLoading: !data && !error };
};
