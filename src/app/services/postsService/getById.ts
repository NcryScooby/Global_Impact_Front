import { httpClient } from '../httpClient';

export interface PostProps {
  post: {
    id: string;
    title: string;
    content: string;
    image: string;
    tags: [];
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
  };
}

export const getById = async (postId: string) => {
  const { data } = await httpClient.get<PostProps>(`/posts/${postId}`);

  return data;
};
