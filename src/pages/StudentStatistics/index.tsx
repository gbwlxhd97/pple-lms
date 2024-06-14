import StudentTable from '@/components/common/StudentTable';
import Title from '@/components/common/Title/Title';
import courseAPIList from '@/services/course';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const StudentStaticsPage = () => {
  const { courseId } = useParams();
  const [students, setStudents] = useState([]);
  const getStudents = async () => {
    const res = await courseAPIList.getCourseStudents(Number(courseId));
    console.log(res);
    setStudents(res.data);
  };

  useEffect(() => {
    getStudents();
  }, []);
  return (
    <>
      <Title title="학생통계" />
      학생 개인 통계
      <StudentTable
        tableHead={['iD', '이름', '전화번호']}
        tableBody={students}
      />
    </>
  );
};

export default StudentStaticsPage;
