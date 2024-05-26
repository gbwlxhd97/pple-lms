import React, { useRef, useState } from 'react';
import styles from './index.module.scss';
import useOutsideClick from '@/hooks/useOutsideClick';



type AllianceDropdownProps = {
  region?: string;
  setRegion: React.Dispatch<string>;
  options: Array<any>; 
};
const AllianceDropdown = ({
  region,
  setRegion,
  options,
}: AllianceDropdownProps) => {
  const [activeDropdown, setActiveDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  console.log(region,"reigon");
  
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
          value={region}
          placeholder="지역을 선택해주세요"
          readOnly
          ref={inputRef}
        />
        {/* <StaticImage
          className={`${styles.AllianceDropdownArrow} ${activeDropdown ? styles.Active : ''} `}
          src="../../../images/arrow_drop_down.svg"
          alt="arrowDropDown"
        /> */}
        {activeDropdown && (
          <div className={styles.AllianceDropdownDistrictWrapper}>
            {options?.map((district, idx) => (
              <div
                key={district + idx}
                onClick={() => {
                  setRegion(district);
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

export default AllianceDropdown;
