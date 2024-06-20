import React, { useState } from 'react';
import styles from './index.module.scss';
import { ArrowRightIcon } from '@/icons/icon';

type SelectProps = {
  placeholder: string;
  options: Array<any>;
  label?: string;
}
const Select = ({placeholder,options,label} : SelectProps) => {
  const [activeDropdown, setActiveDropdown] = useState(false);
  const [values, setValues] = useState();
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
                    setValues(district);
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
    </>
  );
}

export default Select;