import { requestAPI } from '@/utils/fetch'

const startAttendTimer = async (id:any) => {
  const {data} = await requestAPI().post(`/api/attend/setAttendTimer?courseSectionId=${id}`);
  return data;
}


const attendAPIList = {
  startAttendTimer
}

export default attendAPIList;