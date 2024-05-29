import { useEffect, useState } from 'react';
import AllianceDropdown from '../attendanceSelect';
import Button from '../common/Button/Button';
import styles from './index.module.scss';
import { useLocation } from 'react-router-dom';
import attendAPIList from '@/services/attend';
import { ISection } from '@/interfaces/section';
import TimeCircleIcon from '@/icons/icon/TimeCircle';
import Timer from '../common/Timer/Timer';

type TeacherAttendanceProps = {
  weekSection: Array<ISection>;
  setStudentAttend: React.Dispatch<any>;
};

const TeacherAttendance = ({
  weekSection,
  setStudentAttend,
}: TeacherAttendanceProps) => {
  const { state } = useLocation();
  
  const [studySession, setStudySession] = useState<any>(
    state ?? '차시를 골라주세요'
  );
  const [attendCode, setAttendCode] = useState(0);
  const [isEndSection, setIsEndSection] = useState(false);
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

  const getAttendInfo = async () => {
    try {
      const res = await attendAPIList.getShowAttendPage();
      console.log(res, '레스레스');
    } catch (error) {
      console.log(error);
      
    }
  };
  
  useEffect(() => {
    // getAttendInfo();
    if (studySession.courseSectionId) {
      getCourse();
    }
  }, [studySession]);

  const setStartCourse = async () => {
    const res = await attendAPIList.startAttendTimer(
      studySession.courseSectionId
    );
    setAttendCode(res.attendCode)
    console.log(res,"수업시작번호");
    
  }

  const endCourse = async () => {
    try {
      const res = await attendAPIList.endAttend(studySession.courseSectionId);
      setIsEndSection(true)
    } catch (error) {
      
    }
    

  }

  const isValidateStartButton = studySession.courseSectionId;
  return (
    <div className={styles.TeachAttendContainer}>
      <AllianceDropdown
        region={studySession}
        setRegion={setStudySession}
        options={weekSection}
      />
      {studySession.title && (
        <div className={styles.TeacherAttendanceButtonWrap}>
          <Button
            buttonType={attendCode !== 0 ? 'Disabled' : 'Active'}
            onClick={setStartCourse}
          >
            수업 시작하기
          </Button>
          <Button buttonType={isEndSection ? 'Disabled' : 'Abled'}>
            수업 끝내기
          </Button>
        </div>
      )}
      {attendCode !== 0 && (
        <div className={styles.AttendCodeWrap}>
          출석 코드 : <span>{attendCode}</span>
          <div className={styles.AttendTimerWrap}>
            <TimeCircleIcon width={20} height={20} />
            <Timer duration={600} isComplete={false} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherAttendance;