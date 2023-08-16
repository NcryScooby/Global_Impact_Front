import { PaginationParams } from '../../interfaces/PaginationParams';
import { httpClient } from '../httpClient';

export interface getAllByAuthorIdPostsResponse {
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
  meta: {
    totalCount: number;
    currentPage: number;
    totalPages: number;
  };
}

interface GetAllByAuthorIdPostsParams extends PaginationParams {
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
