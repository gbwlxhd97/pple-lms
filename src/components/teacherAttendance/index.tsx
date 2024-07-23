import { useEffect, useState } from 'react';
import AllianceDropdown from '../attendanceSelect';
import Button from '../common/Button/Button';
import styles from './index.module.scss';
import { useLocation, useParams } from 'react-router-dom';
import attendAPIList from '@/services/attend';
import { ISection } from '@/interfaces/section';
import TimeCircleIcon from '@/icons/icon/TimeCircle';
import Timer from '../common/Timer/Timer';
import toast from 'react-hot-toast';

type TeacherAttendanceProps = {
  weekSection: Array<ISection>;
  setStudentAttend: React.Dispatch<any>;
};

const TeacherAttendance = ({
  weekSection,
  setStudentAttend,
}: TeacherAttendanceProps) => {
  const { state } = useLocation();
  const {courseId} = useParams()
  
  const [studySession, setStudySession] = useState<any>('차시를 골라주세요');
  const [attendCode, setAttendCode] = useState(0);
  const [isEndSection, setIsEndSection] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const getCourse = async () => {
    try {
      const res = await attendAPIList.getSectionAttend(
        studySession?.courseSectionId
      );
      console.log(res,"출석데이터?");
      setStudentAttend(res);
    } catch (error) {}
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
    if (studySession?.courseSectionId) {
      // getAttendInfo();
      console.log(studySession, '스터디세션');

      getCourse();
    }
  }, [studySession]);

  const setStartCourse = async () => {
    try {
      const res = await attendAPIList.startAttendTimer(
        studySession?.courseSectionId
      );
      setAttendCode(res.attendCode);
      getCourse();
      console.log(res, '수업시작번호');
    } catch (error: any) {
      console.log(error);
      toast.error('출석 에러 발생');
    }
  };

  const endCourse = async () => {
    setIsLoading(true);
    try {
      const res = await attendAPIList.endAttend(studySession?.courseSectionId);
      setIsEndSection(true);
      getCourse();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const isValidateStartButton = courseId;
  return (
    <div className={styles.TeachAttendContainer}>
      <AllianceDropdown
        region={studySession}
        setRegion={setStudySession}
        options={weekSection}
      />
      {studySession && (
        <div className={styles.TeacherAttendanceButtonWrap}>
          <Button
            buttonType={attendCode !== 0 ? 'Disabled' : 'Active'}
            onClick={setStartCourse}
          >
            수업 시작하기
          </Button>
          <Button
            buttonType={
              isEndSection
                ? 'Disabled'
                : attendCode === 0
                  ? 'Disabled'
                  : 'Abled'
            }
            onClick={endCourse}
            isLoading={isLoading}
          >
            수업 끝내기
          </Button>
        </div>
      )}
      {attendCode !== 0 && !isEndSection && (
        <div className={styles.AttendCodeWrap}>
          출석 코드 : <span>{attendCode}</span>
          <div className={styles.AttendTimerWrap}>
            <TimeCircleIcon width={20} height={20} />
            <Timer duration={600} isSignUp={false} isComplete={isEndSection} />
          </div>
          <div className={styles.AttendButtonWrap}>
            <Button
              buttonType={isEndSection ? 'Disabled' : 'Abled'}
              onClick={getCourse}
            >
              출석정보 조회
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherAttendance;
