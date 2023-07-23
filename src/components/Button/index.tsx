import React, { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  type?: 'button' | 'submit';
  styles?: {
    width?: '' | 'full';
  };
  onClick?: () => void;
}

const Button = ({ children, type = 'button', styles = {}, onClick = () => {} }: Props) => {
  return (
    <button
      className={`mt-2 h-10 w-80 font-bold rounded-lg bg-slate-600 active:bg-slate-800 ${
        styles?.width === 'full' ? 'w-full' : ''
      }`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
