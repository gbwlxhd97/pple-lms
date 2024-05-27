import { useEffect, useState } from 'react';
import AllianceDropdown from '../attendanceSelect';
import Button from '../common/Button/Button';
import styles from './index.module.scss';
import { useLocation } from 'react-router-dom';
import attendAPIList from '@/services/attend';
import { ISection } from '@/interfaces/section';

type TeacherAttendanceProps = {
  weekSection: Array<ISection>;
};

const TeacherAttendance = ({ weekSection } : TeacherAttendanceProps) => {
  const { state } = useLocation();
  const [studySession, setStudySession] = useState<any>(state ?? "차시를 골라주세요");

  const getCourse = async () => {
    const res = await attendAPIList.getSectionAttend(1);
    console.log(res);
  };

  useEffect(() => {
    getCourse()
  }, []);
  return (
    <>
      <AllianceDropdown
        region={studySession}
        setRegion={setStudySession}
        options={weekSection}
      />
      <div className={styles.TeacherAttendanceButtonWrap}>
        <Button buttonType="Active">수업 시작하기</Button>
        <Button buttonType="Abled">수업 끝내기</Button>
      </div>
    </>
  );
};

export default TeacherAttendance;