import React, { useState } from 'react';
import styles from './index.module.scss';
import { ArrowRightIcon } from '@/icons/icon';


type NoticeSelectProps = {
  options:Array<any>;
  placeholder: string;
  setSelectItem: React.Dispatch<any>,
  selectedItem: any;
}

const NoticeSelect = ({
  options,
  placeholder,
  setSelectItem,
  selectedItem,
}: NoticeSelectProps) => {
  const [activeDropdown, setActiveDropdown] = useState(false);
  return (
    <div className={styles.AllianceDropdownWrapper}>
      <div
        className={styles.AllianceDropdownContainer}
        onClick={() => {
          setActiveDropdown((prev) => !prev);
        }}
      >
        <input
          className={styles.AllianceDropdownInput}
          value={selectedItem}
          placeholder={placeholder}
          readOnly
        />
        <ArrowRightIcon
          width={20}
          height={20}
          stroke="#000"
          className={`${styles.AllianceDropdownArrow} ${activeDropdown ? styles.Active : ''} `}
        />
        {activeDropdown && (
          <div className={styles.AllianceDropdownDistrictWrapper}>
            {options?.map((district, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setSelectItem(district);
                }}
                className={styles.AllianceDropdownDistrict}
              >
                {district}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NoticeSelect