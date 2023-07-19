import useSWR from 'swr';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { undefined } from 'zod';

export const USER_SECTION = `/api/user/session`;

export const useUserSection = () => {
  const router = useRouter();
  const { data, isLoading, error, mutate } = useSWR(USER_SECTION);

  useEffect(() => {
    console.log('user session', data, isLoading, error);
    if (!isLoading && error?.response) {
      router.replace('/user/login');
    }
  }, [data, error, isLoading, mutate, router]);

  return { data, error, isLoading };
};
