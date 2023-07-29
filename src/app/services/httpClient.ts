import { localStorageKeys } from "../config/localStorageKeys";
import axios from "axios";
import { sleep } from "../utils/sleep";

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

httpClient.interceptors.request.use(async (config) => {
  await sleep(500);

  const token = localStorage.getItem(localStorageKeys.TOKEN);

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

httpClient.interceptors.response.use(async (data) => {
  await sleep(500);

  return data;
});
