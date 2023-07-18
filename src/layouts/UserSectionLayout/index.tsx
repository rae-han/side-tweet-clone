import React, { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {}

const UserSectionLayout = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default UserSectionLayout;
