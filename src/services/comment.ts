import { requestAPI } from '@/utils/fetch';

const getStudentComments = async (courseId: number, studentId: number) => {
  const data = await requestAPI().get(
    `/comment/courses/${courseId}/students/${studentId}/comments`
  );
  return data;
};

const commentAPIList = {
  getStudentComments,
};

export default commentAPIList;
