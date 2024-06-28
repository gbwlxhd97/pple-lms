import StudentTable from '@/components/common/StudentTable';
import Title from '@/components/common/Title/Title';
import courseAPIList from '@/services/course';
import statisticsAPIList from '@/services/statistics';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Bar, BarChart, CartesianGrid, Legend, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import styles from './index.module.scss';
const StudentStaticsPage = () => {
  const { courseId } = useParams();
  const [students, setStudents] = useState([]);
  const [isTotalStudentStat, setIsTotalStudentStat] = useState(true); //default 
  const [totalStudents,setTotalStudent] = useState<any>({})
  const getStatDatas = async () => {
    try {
      if (isTotalStudentStat) {
        const res = await statisticsAPIList.getStudentMonthStatistics(Number(courseId))
        console.log(res);
        setTotalStudent(res);
      } else {
        const res = await courseAPIList.getCourseStudents(Number(courseId));
        console.log(res);
        setStudents(res.data);
      }
    } catch (error) {
      
    }
  }


  useEffect(() => {
    getStatDatas();
  }, [isTotalStudentStat]);
  return (
    <>
      <Title title="학생통계" />

      <div className={styles.StudentFlexWrap}>
        <div
          onClick={() => {
            setIsTotalStudentStat(true);
          }}
          className={`${styles.StudentChild} ${isTotalStudentStat && styles.Active}`}
        >
          학생전체통계
        </div>
        <div
          onClick={() => {
            setIsTotalStudentStat(false);
          }}
          className={`${styles.StudentChild} ${!isTotalStudentStat && styles.Active}`}
        >
          학생개인통계
        </div>
      </div>
      {isTotalStudentStat && (
        <>
          <ResponsiveContainer width={'100%'} height={'50%'}>
            <BarChart
              data={totalStudents}
              dataKey="date"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="totalCount"
                fill="#8884d8"
                activeBar={<Rectangle fill="pink" stroke="blue" />}
              />
              <Bar
                dataKey="attendCount"
                fill="#82ca9d"
                activeBar={<Rectangle fill="gold" stroke="purple" />}
              />
            </BarChart>
          </ResponsiveContainer>
        </>
      )}
      {!isTotalStudentStat && (
        <StudentTable
          tableHead={['iD', '이름', '전화번호']}
          tableBody={students}
        />
      )}
    </>
  );
};

export default StudentStaticsPage;
