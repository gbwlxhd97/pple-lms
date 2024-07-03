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
  const [selectedCourseSectionId, setSelectedCourseSectionId] = useState(1);
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
        selectedCourseSectionId
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
        selectedCourseSectionId
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

  const selectRound = (courseSectionId: number) => {
    setSelectedCourseSectionId(courseSectionId);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    getGrowthData();
  }, [selectedCourseSectionId]);

  return (
    <>
      <Title title="성장기록부" />
      <div className={styles.leftSection} onClick={toggleDropdown}>
        <span className={styles.round}>{selectedCourseSectionId}차시</span>
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
                onClick={() => selectRound(round.id)}
              >
                {round.name}
              </div>
            ))}
          </div>
        )}
      </div>
      <NoCommentInput
        selectedItem={selectedNoCommentStudent}
        fetchComments={getGrowthData}
        setSelectedItem={setSelectedNoCommentStudent}
        options={noCommentData}
        couseSectionId={selectedCourseSectionId}
      />
      <GrowthTable tableHead={['이름', '내용']} tableBody={growthData} />
    </>
  );
}

export default GrowthPage