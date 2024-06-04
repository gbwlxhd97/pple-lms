import { requestAPI } from '@/utils/fetch';

type insertRequestBody = {
  title: string;
  main: string;
  courseId : number;
}
const insertNotice = async (requestBody: insertRequestBody) => {
  const data = await requestAPI().post('/notice/write',requestBody)
  return data;
}

const getNoticeList = async (courseId: number) => {
  const data = await requestAPI().get('/notice/readList')
  return data;
}

const noticeAPIList = {
  insertNotice,
  getNoticeList
}

export default noticeAPIList