import React, { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {}

const UserSectionLayout = ({ children }: Props) => {
  return <div className="w-screen h-screen flex flex-col justify-center items-center">{children}</div>;
};

export default UserSectionLayout;
