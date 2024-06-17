import { requestAPI } from '@/utils/fetch';

const getTotalStudentStatistics = async (courseId:number) => {
  const {data} = await requestAPI().get(`/statistics/course/students?courseId=${courseId}`);
  return data;
}


const statisticsAPIList = {
  getTotalStudentStatistics
}

export default statisticsAPIList;