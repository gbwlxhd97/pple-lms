import { requestAPI } from '@/utils/fetch'

const startAttendTimer = async (id:any) => {
  const {data} = await requestAPI().post(`/attend/setAttendTimer?courseSectionId=${id}`);
  return data;
}

const getTeacherSectionTitle = async () => {
  const data = await requestAPI().get('/attend/getSectionTitle')
  return data
}

const attendAPIList = {
  startAttendTimer,
  getTeacherSectionTitle
}

export default attendAPIList;