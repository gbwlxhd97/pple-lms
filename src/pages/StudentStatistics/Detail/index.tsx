import commentAPIList from '@/services/comment';
import statisticsAPIList from '@/services/statistics';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import styles from './index.module.scss';
import { ITotalStudent } from '@/interfaces/statistics';
import StudentInfoChart from '@/components/common/StudentInfoChart';


const StudentStatisticsDetailPage = () => {
  const { courseId, studentId } = useParams();
  const [studentData, setStudentData] = useState<ITotalStudent | any>();

  const getCommentInfo = async () => {
    try {
      const res = await statisticsAPIList.getStudentDetailStatistics(
        Number(courseId),
        Number(studentId)
      );
      console.log(res);
      setStudentData(res);
    } catch (error) {
      console.error(error);
    }
  };


  const getDetailComments = async () => {
    const res = await commentAPIList.getStudentComments(Number(courseId),Number(studentId))
    console.log(res);
    
  }

  useEffect(() => {
    getCommentInfo();
    getDetailComments()
  }, []);
  // TODO: Chart 컴포넌트 분리해서 작업ㄴ
  return (
    <>
      <StudentInfoChart studentData={studentData} />
      <div className="Space"></div>
      학생코맨트
    </>
  );
};

export default StudentStatisticsDetailPage;
