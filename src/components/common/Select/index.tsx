import React, { useState } from 'react';
import styles from './index.module.scss';
import { ArrowRightIcon } from '@/icons/icon';

type SelectProps = {
  placeholder: string;
  options: Array<any>;
  label?: string;
  values: any;
  setValues: any;
};
const Select = ({placeholder,options,label,values,setValues} : SelectProps) => {
  const [activeDropdown, setActiveDropdown] = useState(false);
  return (
    <>
      <div className={styles.InputLabel}>{label}</div>
      <div className={styles.AllianceDropdownWrapper}>
        <div
          className={styles.AllianceDropdownContainer}
          onClick={() => {
            setActiveDropdown((prev) => !prev);
          }}
        >
          <input
            className={styles.AllianceDropdownInput}
            placeholder={placeholder}
            readOnly
            value={values}
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
                    setValues(district.label);
                  }}
                  className={styles.AllianceDropdownDistrict}
                >
                  {district.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Select;