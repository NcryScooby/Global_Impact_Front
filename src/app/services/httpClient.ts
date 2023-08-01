import { localStorageKeys } from '../config/keys';
import { sleep } from '../utils/functions/sleep';
import { env } from '../config/env';
import axios from 'axios';

export const httpClient = axios.create({
  baseURL: env.apiUrl,
});

httpClient.interceptors.request.use(async (config) => {
  await sleep(500);

  const token = localStorage.getItem(localStorageKeys.TOKEN);

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

httpClient.interceptors.response.use(async (data) => {
  await sleep(500);

  return data;
});
