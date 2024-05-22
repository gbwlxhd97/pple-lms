import { ReactNode } from 'react';
import styles from './CheckBox.module.scss';

type CheckBoxProps = {
  checkBoxType: 'Active' | 'Default';
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
};

const CheckBox = ({
  checkBoxType,
  className,
  children,
  onClick,
}: CheckBoxProps) => {
  return (
    <button
      className={`${className} ${styles[checkBoxType]}`}
      onClick={onClick}
    >
      <div className={styles.CheckBoxFlex}>
        <div className={`${className} ${styles[checkBoxType]}`}></div>
        {children}
      </div>
    </button>
  );
};

export default CheckBox;
