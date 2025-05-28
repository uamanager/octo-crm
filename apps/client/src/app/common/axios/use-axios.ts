import axios, { AxiosError } from 'axios';
import qs from 'qs';
import { getAccessToken, setAccessToken } from '../storage/token.storage';

export const AxiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: (params) => {
    return qs.stringify(params, {
      arrayFormat: 'repeat',
      allowDots: true,
    });
  },
});
AxiosClient.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

AxiosClient.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => {
    console.error('AxiosClient', error);

    if (error.response?.status === 401) {
      setAccessToken(null);
    }

    return Promise.reject(error);
  },
);
