import { IPaginationParams } from '@interfaces/pagination/IPaginationParams';
import { IMeta } from '@interfaces/pagination/IMeta';
import { IPost } from '@interfaces/posts/IPost';
import { httpClient } from '../httpClient';

export interface getAllByAuthorIdPostsResponse {
  posts: IPost[];
  meta: IMeta;
}

interface GetAllByAuthorIdPostsParams extends IPaginationParams {
  title?: string;
}

export const getAllByAuthorId = async (
  authorId: string,
  params?: GetAllByAuthorIdPostsParams
): Promise<getAllByAuthorIdPostsResponse> => {
  const { data } = await httpClient.get<getAllByAuthorIdPostsResponse>(
    `/posts/authors/${authorId}`,
    {
      params,
    }
  );

  return data;
};
