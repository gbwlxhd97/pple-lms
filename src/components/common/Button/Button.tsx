import React, { ReactNode } from 'react';
import styles from './Button.module.scss';

type ButtonProps = {
  buttonType:
    | 'Gray'
    | 'White'
    | 'Primary'
    | 'Disabled'
    | 'Reserved'
    | 'TimeActive'
    | 'Active'
    | 'Abled'
    | 'TimeDisabled'
    | 'TimeDisabled'
    | 'Spacing';
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
};

const Button = ({ children, buttonType, className, onClick }: ButtonProps) => {
  return (
    <button
      disabled={['Disabled', 'Active'].includes(buttonType)}
      className={`${className} ${styles[buttonType]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
