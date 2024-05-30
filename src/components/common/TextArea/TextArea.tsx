import React, { forwardRef } from 'react';
import styles from './TextArea.module.scss';

type TextAreaProps = {
  placeholder?: string;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  name?: string;
  label?: string;
  onKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
};

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (props, ref) => {
    return (
      <div className={styles.TextAreaWrap}>
        <div className={styles.TextAreaLabel}>{props.label}</div>
        <textarea
          className={`${props.className} ${styles.TextAreaField}`}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

export default TextArea;
