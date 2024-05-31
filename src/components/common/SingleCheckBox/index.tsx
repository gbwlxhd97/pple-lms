import { ReactNode } from 'react';
import styles from './index.module.scss';

type CheckBoxProps = {
  checkBoxType: 'Active' | 'Default';
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
};

/**
 * Single Checkbox
 * @param param0 
 * @returns 
 */
const SingleCheckBox = ({
  checkBoxType,
  className,
  children,
  onClick,
}: CheckBoxProps) => {
  return (
      <div className={styles.CheckBoxFlex} onClick={onClick}>
        <div className={`${className} ${styles[checkBoxType]}`}></div>
        {children}
      </div>
  );
};

export default SingleCheckBox;
