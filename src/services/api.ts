import axios, { AxiosResponse } from 'axios';

export interface AxiosResponseWithResponseTime extends AxiosResponse {
  responseTime: number;
}

const api = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github.v3+json',
  },
});

let requestTimeStart = 0;

axios.interceptors.request.use(
  config => {
    requestTimeStart = new Date().getMilliseconds();
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  response => {
    const requestTimeEnd = new Date().getMilliseconds();
    const responseTime = requestTimeEnd - requestTimeStart;

    const resWithResponseTime = {
      ...response,
      responseTime,
    };

    return resWithResponseTime;
  },
  error => {
    return Promise.reject(error);
  },
);

export default api;
