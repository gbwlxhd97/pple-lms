import React, { forwardRef } from 'react';
import styles from './Input2.module.scss';

type InputProps = {
  type: string;
  placeholder?: string;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  label?: string;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  value?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <div className={styles.InputWrap}>
      <div className={styles.InputLabel}>{props.label}</div>
      <input
        className={`${props.className} ${styles.InputField}`}
        ref={ref}
        {...props}
      />
    </div>
  );
});

export default Input;
