import useSWR from 'swr';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const USER_SECTION = `/api/user/section`;

export const useUserSection = () => {
  const router = useRouter();
  const { data, isLoading, error } = useSWR(USER_SECTION);

  useEffect(() => {
    console.log(1, data, error);
    console.log({ data, isLoading, error });
  }, [data, error, router]);

  return { data: data?.session, error, isLoading: !data && !error };
};
