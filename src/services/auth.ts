import { requestAPI } from '@/utils/fetch';

type loginBody = {
  tel: string;
  password: string;
};

const login = async (requestBody: loginBody) => {
  const { data } = await requestAPI().post(
    `/auth/loginWithSessionKey`,
    requestBody
  );
  return data;
};

const authAPIList = {
  login,
};

export default authAPIList;
