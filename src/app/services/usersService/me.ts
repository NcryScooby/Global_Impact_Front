import type { ISavedPost } from '@interfaces/posts/ISavedPost';
import type { IUser } from '@interfaces/posts/IUser';
import { httpClient } from '../httpClient';

export interface MeResponse {
  user: IUser;
  savedPosts: ISavedPost[];
}

export const me = async (): Promise<MeResponse> => {
  const { data } = await httpClient.get<MeResponse>('/users/me');

  return data;
};
