import { IPaginationParams } from '../../interfaces/pagination/IPaginationParams';
import { IMeta } from '../../interfaces/pagination/IMeta';
import { httpClient } from '../httpClient';

export interface GetAllByCategoryIdPostsResponse {
  posts: [
    {
      id: string;
      title: string;
      content: string;
      image: string;
      tags: [];
      likes: [];
      comments: [];
      category: {
        id: string;
        name: string;
      };
      author: {
        id: string;
        name: string;
        email: string;
        job: {
          id: string;
          name: string;
        };
        avatar: string;
      };
      createdAt: string;
      views: number;
    }
  ];
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
