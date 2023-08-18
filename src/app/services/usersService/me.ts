import { httpClient } from '../httpClient';

export interface MeResponse {
  user: {
    id: string;
    name: string;
    email: string;
    avatar: string;
    job: {
      id: string;
      name: string;
    };
  };
}

export const me = async (): Promise<MeResponse> => {
  const { data } = await httpClient.get<MeResponse>('/users/me');

  return data;
};
