import React, { forwardRef } from 'react';
import styles from './Input.module.scss';

type InputProps = {
  type: string;
  placeholder?: string;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  label?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <div className={styles.InputWrap}>
      <div className={styles.InputLabel}>{props.label}</div>
      <input
        className={`${props.className} ${styles.InputField}`}
        ref={ref} // 이 부분이 추가되었습니다.
        {...props}
      />
    </div>
  );
});

export default Input;
