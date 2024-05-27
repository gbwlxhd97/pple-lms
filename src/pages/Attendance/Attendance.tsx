import Button from '@/components/common/Button/Button';
import Input from '@/components/common/Input/Input';
import Title from '@/components/common/Title/Title';
import styles from './Attendance.module.scss';
import Table from '@/components/common/Table/Table';
import TeacherAttendance from '@/components/teacherAttendance';
import { useEffect, useState } from 'react';
import attendAPIList from '@/services/attend';

const AttendancePage = () => {

  const [weekSection,setWeekSection ] = useState()

  const getTeacherSection = async () => {
    try {
      const res = await attendAPIList.getTeacherSectionTitle();
      console.log(res);
      setWeekSection(res);
    } catch (error) {
      
    }
  }

  useEffect(() => {
    getTeacherSection();
  },[])
  return (
    <>
      <Title title="출석체크" />
      <TeacherAttendance weekSection={weekSection || []} />
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
