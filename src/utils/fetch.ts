import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const handleResponse = (response: AxiosResponse) => {
  // if (response.status === 400) {
  //   return null;
  // }
  return response;
};

axiosInstance?.interceptors.request.use((config) => {
  const session = Cookies.get('sessionKey');
  if (session) {
    config.headers['sessionKey'] = `${session}`;
  }
  return config;
});
export const requestAPI = () => {
  const request = (method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH') => {
    return (url: string, bodyJson?: any, contentType?: string) => {
      return axiosInstance({
        url,
        method: method,
        data: bodyJson,
        headers: {
          'Content-Type': contentType ?? 'application/json',
        },
        withCredentials: true,
      })
        .then(handleResponse)
        .catch((err) => {
          console.log(err.response);
          // 401 Unauthorized가 아닌 다른 에러라면
          if (err.response?.status !== 401) {
            return Promise.reject(err);
          }
          throw err;
        });
    };
  };

  return {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE'),
    patch: request('PATCH'),
  };
};
