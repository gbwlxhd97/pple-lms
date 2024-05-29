import { requestAPI } from '@/utils/fetch'

const startAttendTimer = async (id:any) => {
  const {data} = await requestAPI().post(`/attend/setAttendTimer?courseSectionId=${id}`);
  return data;
}

const getTeacherSectionTitle = async () => {
  const {data} = await requestAPI().get('/attend/getSectionTitle')
  return data
}

// 
const getShowAttendPage = async () => {
  const data = await requestAPI().get('/attend/showAttendPage')
  return data
}


// 각 차시의 학생들 출석정보를 조회
const getSectionAttend = async (id:number) => {
  const {data} = await requestAPI().get(
    `/attend/getSectionAttend?courseSectionId=${id}`
  );
  return data;
}

type RequestBody = {
  attendCode: number;
  courseSectionId: number;
}

const insetAttendCode = async (requestBody:RequestBody) => {
  const data = await requestAPI().post(`/attend/attend`,requestBody)
  return data;
}

const endAttend = async (id:number) => {
  const data = await requestAPI().post(`/attend/endSection?courseSectionId=${id}`)
  return data;
}

const attendAPIList = {
  startAttendTimer,
  getTeacherSectionTitle,
  getShowAttendPage,
  getSectionAttend,
  insetAttendCode,
  endAttend,
};

export default attendAPIList;