import { requestAPI } from '@/utils/fetch'

const startAttendTimer = async (id:any) => {
  const {data} = await requestAPI().post(`/attend/setAttendTimer?courseSectionId=${id}`);
  return data;
}

const getTeacherSectionTitle = async () => {
  const {data} = await requestAPI().get('/attend/getSectionTitle')
  return data
}

const getSection = async () => {
  const data = await requestAPI().get('/course/showCoursePage?courseId=1');
  return data
}

const getCourseSection = async () => {
  const data = await requestAPI().get('/course/showCourseSection?courseId=1');
  return data;
};

const getShowAttendPage = async () => {
  const data = await requestAPI().get('/attend/showAttendPage')
  return data
}

const getSectionAttend = async (id:number) => {
  const data = await requestAPI().get(
    `/attend/getSectionAttend?courseSectionId=${id}`
  );
  return data;
}

const attendAPIList = {
  startAttendTimer,
  getTeacherSectionTitle,
  getSection,
  getCourseSection,
  getShowAttendPage,
  getSectionAttend,
};

export default attendAPIList;