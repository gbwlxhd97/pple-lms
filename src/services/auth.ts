import { requestAPI } from '@/utils/fetch';

type loginBody = {
  tel: string;
  password: string;
};

const login = async (requestBody: loginBody) => {
  const { data } = await requestAPI().post(
    `/auth/login`,
    requestBody
  );
  return data;
};

const logout = async () => {
  const data = await requestAPI().post('/auth/logout')
  return data
}

const profile = async () => {
  const {data} = await requestAPI().get('/auth/profile')
  return data
}

const authAPIList = {
  login,
  logout,
  profile
};

export default authAPIList;
