import React, { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  type?: 'button' | 'submit';
  onClick?: () => void;
}

const Button = ({ children, type = 'button', onClick = () => {} }: Props) => {
  return (
    <button type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
