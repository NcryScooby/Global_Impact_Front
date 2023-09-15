import { IUser } from '@interfaces/posts/IUser';
import { httpClient } from '../httpClient';

export interface MeResponse {
  user: IUser;
}

export const me = async (): Promise<MeResponse> => {
  const { data } = await httpClient.get<MeResponse>('/users/me');

  return data;
};
