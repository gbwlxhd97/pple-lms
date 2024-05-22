import { IRegister } from '@/interfaces/member';
import { requestAPI } from '@/utils/fetch';

type identityCodeBody = {
  tel: string;
};
const memberIdentityCheck = async (requestBody: identityCodeBody) => {
  const { data } = await requestAPI().post(`/user/identityCheck`, requestBody);
  return data;
};

type identiyCodeCheckBody = {
  authCode: number;
};

const memberIdentityCodeCheck = async (authCode: identiyCodeCheckBody) => {
  const { data } = await requestAPI().post(`/user/identityCodeCheck`, authCode);
  return data;
};

const memberRegister = async (request: IRegister) => {
  const { data } = await requestAPI().post('/user/register', request);
  return data;
};

const memberShowMyInfo = async (id: string) => {
  const { data } = await requestAPI().get(`/user/showMyInfoform/${id}`);
  return data;
};

const memberShow = async (id: string) => {
  const { data } = await requestAPI().get(`/user/showMyInfoform/${id}`);
  return data;
};

const memberAPIList = {
  memberIdentityCheck,
  memberIdentityCodeCheck,
  memberRegister,
  memberShowMyInfo,
  memberShow,
};

export default memberAPIList;
