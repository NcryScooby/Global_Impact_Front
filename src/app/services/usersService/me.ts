import { httpClient } from '../httpClient';

interface MeResponse {
  user: {
    name: string;
    email: string;
  };
}

export const me = async () => {
  const { data } = await httpClient.get<MeResponse>('/users/me');

  return data;
};
