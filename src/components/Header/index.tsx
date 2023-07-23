import React, { PropsWithChildren, useEffect } from 'react';
import { useRouter } from 'next/router';

import useMutation from '@hooks/useMutation';
import { useUserSection } from '@hooks/user';

interface Props extends PropsWithChildren {}

const Header = ({ children }: Props) => {
  const router = useRouter();
  const { data, mutate } = useUserSection();
  const { mutation, result } = useMutation('/api/user/session', 'DELETE');

  const handleLogout = () => {
    mutation({});
    mutate({});
  };

  useEffect(() => {
    if (result?.ok) {
      router.push(`/user/login`);
    }
  }, [result, router]);

  return (
    <header>
      {children}
      <button onClick={handleLogout}>logout</button>
    </header>
  );
};

export default Header;
