import React, { PropsWithChildren, useEffect } from 'react';
import { useRouter } from 'next/router';

import useMutation from '@hooks/useMutation';
import { useUserSection } from '@hooks/user';

interface Props extends PropsWithChildren {}

interface UserSessionDeleteResponse {
  ok: boolean;
  code: number;
  message: string;
}

const Header = ({ children }: Props) => {
  const router = useRouter();
  const { data, mutate } = useUserSection();
  const { mutation, result } = useMutation<UserSessionDeleteResponse>('/api/user/session', 'DELETE');

  const handleLogout = () => {
    mutation({});
    mutate({});
  };

  useEffect(() => {
    console.log(444, result);
    if (result?.ok) {
      router.push(`/user/login`);
    }
  }, [result, router]);

  return (
    <header className="h-12 max-w-xl m-auto flex justify-end items-center">
      {children || ''}
      <button className="h-full text-xs py-4" onClick={handleLogout}>
        로그아웃
      </button>
    </header>
  );
};

export default Header;
