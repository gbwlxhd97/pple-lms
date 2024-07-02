import React, { useState } from 'react';
import styles from './index.module.scss';
import { ArrowRightIcon } from '@/icons/icon';


type AgencySelectProps = {
  options:Array<any>;
  placeholder: string;
  setSelectItem: React.Dispatch<any>,
  selectedItem: any;
}

const AgencySelect = ({
  options,
  placeholder,
  setSelectItem,
  selectedItem,
}: AgencySelectProps) => {
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
          value={selectedItem?.name}
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
                {district?.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AgencySelect