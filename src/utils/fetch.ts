import useProfileStore from '@/stores/useProfileStore';
import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { SESSION_KEY } from './constant';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const handleResponse = (response: AxiosResponse) => {
  // if (response.status === 400) {
  //   return null;
  // }
  return response;
};

/**
 * common request
 */
axiosInstance?.interceptors.request.use((config) => {
  const session = Cookies.get(SESSION_KEY);
  if (session) {
    config.headers[SESSION_KEY] = `${session}`;
  }
  return config;
});

/**
 * common response
 * 아래는 401에러나면 세션만료로 로그아웃 시킨다.
 * @returns 
 */

axiosInstance?.interceptors.response.use((response) => {
  return response
},
  (error) => {
    if(error.response && error.response.status === 401) {
      Cookies.remove(SESSION_KEY);
      window.location.reload()
    }
  }
)
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
