import Button from '@/components/common/Button/Button';
import Input from '@/components/common/Input/Input';
import Title from '@/components/common/Title/Title';
import styles from './Attendance.module.scss';
import Table from '@/components/common/Table/Table';
import TeacherAttendance from '@/components/teacherAttendance';
import { useEffect, useState } from 'react';
import attendAPIList from '@/services/attend';
import useProfileStore from '@/stores/useProfileStore';
import StudentAttendanceWrap from '@/components/studentAttendance/StudentAttendanceWrap';

const AttendancePage = () => {

  // teacher 차시
  const [weekSection,setWeekSection ] = useState()
  // 아래 상태는 학생, 선생 출석테이블 state
  const [studentAttend,setStudentAttend] = useState<Array<any>>()


  const {profile : {role}} = useProfileStore()
  const getTeacherSection = async () => {
    try {
      const res = await attendAPIList.getTeacherSectionTitle();
      console.log(res,"24페이지");
      setWeekSection(res);
    } catch (error) {
      
    }
  }

  useEffect(() => {
    if(role === 'TEACHER') {
      getTeacherSection();
    }
  },[])
  return (
    <>
      <Title title="출석체크" />
      {role === 'TEACHER' && (
        <TeacherAttendance
          weekSection={weekSection || []}
          setStudentAttend={setStudentAttend}
        />
      )}
      {role === 'STUDENT' && (
        <StudentAttendanceWrap
          studentWeekSection={studentAttend || []}
          setStudentWeekSection={setStudentAttend}
        />
      )}
      <Title title="출석현황" />
      <div className={styles.AttendanceTable}>
        <Table
          tableBody={studentAttend || []}
          tableHead={['차시', '출석여부']}
        />
      </div>
    </>
  );
};

export default AttendancePage;
