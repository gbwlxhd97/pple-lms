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
  courseId?: number;
  files?: any;
};

const insertNote = async (requestbody: RequestInsertBody) => {
  const data = await requestAPI().post(
    `/note/write`,
    requestbody,
    'multipart/form-data'
  );
  return data;
};

const getCourseReferenceList = async (id:number) => {
  const {data} = await requestAPI().get(`/note/readList?courseId=${id}`)
  return data;
}

const getCourseReferenceDetail = async (id:number) => {
  const {data} = await requestAPI().get(`/note/read?noteId=${id}`)
  return data
}

const courseAPIList = {
  getCoursePage,
  getCourseSection,
  insertNote,
  getCourseReferenceList,
  getCourseReferenceDetail,
};

export default courseAPIList;
