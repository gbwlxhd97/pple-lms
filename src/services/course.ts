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

type RequestInsertBody = {
  title: string;
  main: string;
  courseId: number;
  files?: any;
};

const insertNote = async (requestbody: RequestInsertBody) => {
  const data = await requestAPI().post(`/note/write`, requestbody);
  return data;
};

const courseAPIList = {
  getCoursePage,
  getCourseSection,
  insertNote,
};

export default courseAPIList;
