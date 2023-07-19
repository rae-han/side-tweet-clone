import useSWR from 'swr';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const USER_SECTION = `/api/user/session`;

interface UseSwrResult<T> {
  data: T;
  isLoading: boolean;
  error: object;
}

export const useUserSection = () => {
  const router = useRouter();
  const [state, setState] = useState<UseSwrResult<{ ok: boolean; code: number; message: string; userId: number }>>();
  const { data, isLoading, error, mutate } = useSWR(USER_SECTION);

  useEffect(() => {
    console.log('user session', data, isLoading, error);
    if (!isLoading && error?.response) {
      router.replace('/user/login');
    }
  }, [data, error, isLoading, mutate, router]);

  return { data, error, isLoading, mutate };
};
