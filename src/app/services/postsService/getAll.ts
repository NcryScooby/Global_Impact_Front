import { Post } from '../../interfaces/Post';
import { httpClient } from '../httpClient';

interface PostsParams {
  limit?: number;
  page?: number;
  orderBy?: 'asc' | 'desc';
}

export const getAll = async (params: PostsParams) => {
  const { data } = await httpClient.get<Post>('/posts', {
    params,
  });

  return data;
};
