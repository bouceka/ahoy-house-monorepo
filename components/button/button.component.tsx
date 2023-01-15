// @flow
import * as React from 'react';
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}
export const Button = ({ children, ...props }: Props) => {
  return (
    <button  {...props} className={`btn btn--${props.className}`}>
      {children}
    </button>
  );
};
