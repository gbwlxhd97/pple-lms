import React, { useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
import useOutsideClick from '@/hooks/useOutsideClick';
import { ISection } from '@/interfaces/section';
import attendAPIList from '@/services/attend';



type AllianceDropdownProps = {
  region?: any;
  setRegion: React.Dispatch<any>;
  options: Array<ISection>; 
};
const AllianceDropdown = ({
  region,
  setRegion,
  options,
}: AllianceDropdownProps) => {
  const [activeDropdown, setActiveDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // 셀렉트 박스에서 해당 차시를 선택하면 해당 차시 학생들의 정보를 조회한다.
  const selectAttendSection =  async () => {
    const res = await attendAPIList.getSectionAttend(region?.id)
    console.log(res);
    
  }
  useEffect(() => {
    if(region) {
      selectAttendSection();
    }
  },[])
  
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
          value={region?.title}
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
                key={idx}
                onClick={() => {
                  setRegion(district);
                }}
                className={styles.AllianceDropdownDistrict}
              >
                {district.title}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllianceDropdown;
