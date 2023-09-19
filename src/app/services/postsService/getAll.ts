import type { IPaginationParams } from '@interfaces/pagination/IPaginationParams';
import type { IMeta } from '@interfaces/pagination/IMeta';
import type { IPost } from '@interfaces/posts/IPost';
import { httpClient } from '../httpClient';

export interface GetAllPostsResponse {
  posts: IPost[];
  meta: IMeta;
}

interface GetAllPostsParams extends IPaginationParams {
  title?: string;
}

export const getAll = async (params?: GetAllPostsParams): Promise<GetAllPostsResponse> => {
  const { data } = await httpClient.get<GetAllPostsResponse>('/posts', {
    params,
  });

  return data;
};
