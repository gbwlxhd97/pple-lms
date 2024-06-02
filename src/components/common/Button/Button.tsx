import React, { ReactNode } from 'react';
import styles from './Button.module.scss';
import { TailSpin } from 'react-loader-spinner';

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
    | 'Certification'
    | 'Spacing'
    | 'List';
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
  isLoading?: boolean;
};

const Button = ({
  children,
  buttonType,
  className,
  onClick,
  isLoading,
}: ButtonProps) => {
  return (
    <button
      disabled={['Disabled'].includes(buttonType)}
      className={`${className} ${styles[buttonType]}`}
      onClick={onClick}
    >
      {isLoading ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <TailSpin
            visible={true}
            height="24"
            width="24"
            color="#c7c7c7"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
