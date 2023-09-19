import type { IPaginationParams } from '@interfaces/pagination/IPaginationParams';
import type { IMeta } from '@interfaces/pagination/IMeta';
import type { IPost } from '@interfaces/posts/IPost';
import { httpClient } from '../httpClient';

export interface GetAllByCategoryIdPostsResponse {
  posts: IPost[];
  meta: IMeta;
}

interface GetAllByCategoryIdPostsParams extends IPaginationParams {
  title?: string;
}

export const getAllByCategoryId = async (
  categoryId: string,
  params?: GetAllByCategoryIdPostsParams
): Promise<GetAllByCategoryIdPostsResponse> => {
  const { data } = await httpClient.get<GetAllByCategoryIdPostsResponse>(
    `/posts/categories/${categoryId}`,
    {
      params,
    }
  );

  return data;
};
