import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.scss';
import { useParams } from 'react-router';
import Title from '@/components/common/Title/Title';
import commentAPIList from '@/services/comment';
import GrowthTable from '@/components/common/GrowthTable';
import { ArrowRightIcon } from '@/icons/icon';

const GrowthPage = () => {
  const {courseId,courseSectionId} = useParams()
  const [growthData,setGrowthData] = useState([])
  const [selectedRound, setSelectedRound] = useState('1차시');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const rounds = Array.from({ length: 16 }, (_, i) => `${i + 1}차시`);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const getGrowthData = async () => {
    try {
      const res = await commentAPIList.getDetailCourseSectionComments(
        Number(courseId),
        parseInt(selectedRound)
      );
      console.log(res);
      setGrowthData(res)
    } catch (error) {
      
    }
    
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectRound = (round: string) => {
    setSelectedRound(round);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    getGrowthData();
  }, [selectedRound]);

  return (
    <>
      <Title title="성장기록부" />
      <div className={styles.leftSection} onClick={toggleDropdown}>
        <span className={styles.round}>{selectedRound}</span>
        <span
          className={`${styles.arrowDown} ${isDropdownOpen ? styles.ArrowUp : ''} `}
        >
          <ArrowRightIcon width={12} height={12} stroke="#7879F1" />
        </span>
        {isDropdownOpen && (
          <div className={styles.dropdown} ref={dropdownRef}>
            {rounds.map((round) => (
              <div
                key={round}
                className={styles.dropdownItem}
                onClick={() => selectRound(round)}
              >
                {round}
              </div>
            ))}
          </div>
        )}
      </div>
      <GrowthTable tableHead={['이름', '내용']} tableBody={growthData} />
    </>
  );
}

export default GrowthPage