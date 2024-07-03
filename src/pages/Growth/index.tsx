import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.scss';
import { useParams } from 'react-router';
import Title from '@/components/common/Title/Title';
import commentAPIList from '@/services/comment';
import GrowthTable from '@/components/common/GrowthTable';
import { ArrowRightIcon } from '@/icons/icon';
import AgencySelect from '@/components/agencySelect';
import NoCommentInput from '@/components/common/NoCommentInput';
import courseAPIList from '@/services/course';

const GrowthPage = () => {
  const {courseId,courseSectionId} = useParams()
  const [growthData,setGrowthData] = useState([])
  const [selectedCourseSection, setSelectedCourseSection] = useState<{id:number,name:string}>({
    id:0,
    name: ''
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [courseSectionList, setCourseSectionList] = useState([])
  const [noCommentData, setNoCommentData] = useState([])
  const [selectedNoCommentStudent, setSelectedNoCommentStudent] = useState({
    name: '이름',
    id: 0,
  })
  const dropdownRef = useRef<HTMLDivElement>(null);
  const getGrowthData = async () => {
    try {
      const res = await commentAPIList.getDetailCourseSectionComments(
        Number(courseId),
        selectedCourseSection?.id
      );
      const modifiedData = res.map((comment:any) => {
        if (comment.main.length > 20) {
          return {
            ...comment,
            main: comment.main.substring(0, 20) + '...',
          };
        }
        return comment;
      });
      const noCommentList = await commentAPIList.getNoCommentStudentList(
        selectedCourseSection.id
      );
      const courseSectionList = await courseAPIList.getShowCourseSection(Number(courseId))
      setCourseSectionList(courseSectionList);
      setNoCommentData(noCommentList);
      setGrowthData(modifiedData);
    } catch (error) {
      
    }
    
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectRound = (courseSection: {id:number,name:string}) => {
    setSelectedCourseSection(courseSection);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    getGrowthData();
  }, [selectedCourseSection]);

  return (
    <>
      <Title title="성장기록부" />
      <div className={styles.leftSection} onClick={toggleDropdown}>
        <span className={styles.round}>
          {selectedCourseSection.name
            ? selectedCourseSection.name
            : '차시를 선택하세요.'}
        </span>
        <span
          className={`${styles.arrowDown} ${isDropdownOpen ? styles.ArrowUp : ''} `}
        >
          <ArrowRightIcon width={12} height={12} stroke="#7879F1" />
        </span>
        {isDropdownOpen && (
          <div className={styles.dropdown} ref={dropdownRef}>
            {courseSectionList.map((round: any) => (
              <div
                key={round}
                className={styles.dropdownItem}
                onClick={() => selectRound(round)}
              >
                {round.name}
              </div>
            ))}
          </div>
        )}
      </div>
      {selectedCourseSection.name &&
        noCommentData.length > 0 &&(
          <NoCommentInput
            selectedItem={selectedNoCommentStudent}
            fetchComments={getGrowthData}
            setSelectedItem={setSelectedNoCommentStudent}
            options={noCommentData}
            couseSectionId={selectedCourseSection.id}
          />
        )}

      <GrowthTable tableHead={['이름', '내용']} tableBody={growthData} />
    </>
  );
}

export default GrowthPage