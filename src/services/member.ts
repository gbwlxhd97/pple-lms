import { IRegister } from '@/interfaces/member';
import { requestAPI } from '@/utils/fetch';
import axios from 'axios';
/**
 * api가 member와 auth로 구분되어 있는데
 * member 라우트가 회원가입쪽 api이기 때문에 member와 auth로 분리함
 */
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

const memberShowMainPage = async (ssesion: string) => {
  const { data } = await requestAPI().get(
    `/user/showMyInfoform?memberSessionKey=${ssesion}`
  );
  return data;
};

const memberAPIList = {
  memberIdentityCheck,
  memberIdentityCodeCheck,
  memberRegister,
  memberShowMyInfo,
  memberShowMainPage,
};

export default memberAPIList;
