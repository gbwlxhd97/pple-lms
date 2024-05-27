import { requestAPI } from '@/utils/fetch';

const getCoursePage = async (id: string) => {
  const {data} = await requestAPI().get(`/course/showCoursePage?courseId=${id}`);
  return data;
};

const getCourseSection = async (id:string) => {
  const { data } = await requestAPI().get(
    `/course/showCourseSection?courseId=${id}`
  );
  return data;
};

const courseAPIList = {
  getCoursePage,
  getCourseSection,
};

export default courseAPIList;
