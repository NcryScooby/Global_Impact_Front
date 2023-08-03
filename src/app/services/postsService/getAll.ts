import { PaginationParams } from '../../interfaces/PaginationParams';
import { httpClient } from '../httpClient';

export interface GetAllPostsResponse {
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
      };
      createdAt: string;
    }
  ];
}

export const getAll = async (
  params?: PaginationParams
): Promise<GetAllPostsResponse> => {
  const { data } = await httpClient.get<GetAllPostsResponse>('/posts', {
    params,
  });

  return data;
};
