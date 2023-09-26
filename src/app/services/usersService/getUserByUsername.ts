import type { ISavedPost } from '@interfaces/posts/ISavedPost';
import type { IStatistic } from '@interfaces/posts/IStatistic';
import type { IUser } from '@interfaces/posts/IUser';
import type { IPost } from '@interfaces/posts/IPost';
import { httpClient } from '../httpClient';

export interface GetUserByUsernameResponse {
  user: IUser & {
    statistics: IStatistic;
  };
  latestPosts: IPost[];
  savedPosts: ISavedPost[];
}

export const getUserByUsername = async (username: string): Promise<GetUserByUsernameResponse> => {
  const { data } = await httpClient.get<GetUserByUsernameResponse>(`/users/${username}`);

  return data;
};
