import { requestAPI } from '@/utils/fetch';

type insertRequestBody = {
  title: string;
  main: string;
  toStudent: boolean;
  toParent: boolean;
};

const insertNotice = async (requestBody: insertRequestBody) => {
  const data = await requestAPI().post('/notice/write',requestBody)
  return data;
}

const getNoticeList = async () => {
  const {data} = await requestAPI().get('/notice/readList')
  return data;
}

const getDetailNotice = async (noticeId: number) => {
  const data = await requestAPI().get(`/notice/read?noticeId=${noticeId}`);
  return data;
};

const deleteNotice = async (noticeId:number) => {
  const data = await requestAPI().delete(`notice/delete?noticeId=${noticeId}`)
  return data
}

const noticeAPIList = {
  insertNotice,
  getNoticeList,
  getDetailNotice,
  deleteNotice
};

export default noticeAPIList