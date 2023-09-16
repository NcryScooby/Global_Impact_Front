import { IStatistic } from './../../interfaces/posts/IStatistic';
import { IUser } from '@interfaces/posts/IUser';
import { IPost } from '@interfaces/posts/IPost';
import { httpClient } from '../httpClient';

export interface GetUserByUsernameResponse {
  user: IUser & {
    statistics: IStatistic;
  };
  latestPosts: IPost[];
}

export const getUserByUsername = async (username: string): Promise<GetUserByUsernameResponse> => {
  const { data } = await httpClient.get<GetUserByUsernameResponse>(`/users/${username}`);

  return data;
};
