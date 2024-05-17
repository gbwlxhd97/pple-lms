import axios, { AxiosResponse } from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

const handleResponse = (response: AxiosResponse) => {
  // if (response.status === 400) {
  //   return null;
  // }
  return response;
};

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
        validateStatus: (status) => {
          return true;
        },
      })
        .then(handleResponse)
        .catch((err) => {
          console.log(err.response);
          // 401 Unauthorized가 아닌 다른 에러라면
          if (err.response?.status !== 401) {
            return Promise.reject(err);
          }
          return Promise.resolve(err);
          // 무한 루프 방지 eject
          //   axiosInstance.interceptors.response.eject(0);
          //   return axiosInstance
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
