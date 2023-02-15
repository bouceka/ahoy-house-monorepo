import * as React from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helpText?: string;
  type?: string;
}
export const Input = ({ label, type = 'text', helpText, ...otherProps }: Props) => {
  return (
    <div className='form-item'>
      {label ? <label htmlFor={otherProps.name}>{label}</label> : null}
      <input type={type} className='form-input' {...otherProps} />
      {helpText ? <span className='help-text'>{helpText}</span> : null}
    </div>
  );
};
