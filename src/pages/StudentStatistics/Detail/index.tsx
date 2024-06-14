import commentAPIList from '@/services/comment';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';

const StudentStatisticsDetailPage = () => {
  const { courseId, studentId } = useParams();

  const getCommentInfo = async () => {
    const res = await commentAPIList.getStudentComments(
      Number(courseId),
      Number(studentId)
    );
    console.log(res);
  };

  useEffect(() => {
    getCommentInfo();
  }, []);
  return <>학생디테일페이지</>;
};

export default StudentStatisticsDetailPage;
