import { useEffect, useState } from 'react';
import AllianceDropdown from '../attendanceSelect';
import Button from '../common/Button/Button';
import styles from './index.module.scss';
import { useLocation } from 'react-router-dom';
import attendAPIList from '@/services/attend';
import { ISection } from '@/interfaces/section';

type TeacherAttendanceProps = {
  weekSection: Array<ISection>;
  setStudentAttend: React.Dispatch<any>;
};

const TeacherAttendance = ({
  weekSection,
  setStudentAttend,
}: TeacherAttendanceProps) => {
  const { state } = useLocation();
  console.log(state);
  
  const [studySession, setStudySession] = useState<any>(
    state ?? '차시를 골라주세요'
  );

  const getCourse = async () => {
    try {
      const res = await attendAPIList.getSectionAttend(
        studySession.courseSectionId
      );
      console.log(res);
      setStudentAttend(res)
    } catch (error) {
      
    }
  };
  console.log(studySession,"리전리전");
  
  useEffect(() => {

    getCourse();
    
  }, [studySession]);
  return (
    <div className={styles.TeachAttendContainer}>
      <AllianceDropdown
        region={studySession}
        setRegion={setStudySession}
        options={weekSection}
      />
      <div className={styles.TeacherAttendanceButtonWrap}>
        <Button buttonType="Active">수업 시작하기</Button>
        <Button buttonType="Abled">수업 끝내기</Button>
      </div>
    </div>
  );
};

export default TeacherAttendance;