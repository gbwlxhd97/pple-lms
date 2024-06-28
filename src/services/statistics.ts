import { requestAPI } from '@/utils/fetch';
/**
 * 전체 학생 통계로서
 * 출석,과제 제출 을 반환함
 * @param courseId 
 * @returns 
 */
const getTotalStudentStatistics = async (courseId:number) => {
  const {data} = await requestAPI().get(`/statistics/course/students?courseId=${courseId}`);
  return data;
}

const getStudentMonthStatistics = async (courseId:number) => {
  const {data} = await requestAPI().get(`/statistics/course/students/monthly?courseId=${courseId}`)
  return data;
}


const statisticsAPIList = {
  getTotalStudentStatistics,
  getStudentMonthStatistics
}

export default statisticsAPIList;