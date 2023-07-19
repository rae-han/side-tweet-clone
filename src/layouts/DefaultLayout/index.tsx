import React, { PropsWithChildren } from 'react';

import Header from '@components/Header';

interface Props extends PropsWithChildren {}

const DefaultLayout = ({ children }: Props) => {
  return (
    <div>
      <Header></Header>
      {children}
    </div>
  );
};

export default DefaultLayout;
