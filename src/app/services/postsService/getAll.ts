import { httpClient } from '../httpClient';

export interface Post {
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

interface PostsParams {
  limit?: number;
  page?: number;
  orderBy?: 'asc' | 'desc';
}

export const getAll = async (params?: PostsParams) => {
  const { data } = await httpClient.get<Post>('/posts', {
    params,
  });

  return data;
};
