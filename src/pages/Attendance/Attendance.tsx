import Button from '@/components/common/Button/Button';
import Input from '@/components/common/Input/Input';
import Title from '@/components/common/Title/Title';
import styles from './Attendance.module.scss';
import Table from '@/components/common/Table/Table';
import TeacherAttendance from '@/components/teacherAttendance';
import { useEffect } from 'react';
import attendAPIList from '@/services/attend';

const AttendancePage = () => {

  const getTeacherSection = async () => {
    // const res = attendAPIList.getTeacherSectionTitle()
    // console.log(res);
    
  }

  useEffect(() => {
    getTeacherSection();
  },[])
  return (
    <>
      <Title title="출석체크" />
        <TeacherAttendance />
      <Title title="출석현황" />
      <div className={styles.AttendanceTable}>
        <Table
          tableBody={[
            { key: 1, value: 1222 },
            { key: 2, value: 13333 },
          ]}
          tableHead={['차시', '출석여부']}
        />
      </div>
    </>
  );
};

export default AttendancePage;
