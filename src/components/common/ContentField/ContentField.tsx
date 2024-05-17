import React, { ReactNode } from 'react';

import styles from './ContentField.module.scss';

type ContentFieldProps = {
  children: ReactNode;
  backgroundColor: 'Gray' | 'White';
  className?: string;
};

const ContentField = ({
  children,
  backgroundColor,
  className,
}: ContentFieldProps) => {
  return (
    <div
      className={`${styles.Wrapper} ${styles[backgroundColor]} ${className}`}
    >
      {children}
    </div>
  );
};

export default ContentField;
