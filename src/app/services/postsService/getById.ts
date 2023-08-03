import { httpClient } from '../httpClient';

export interface GetPostByIdResponse {
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

export const getById = async (postId: string): Promise<GetPostByIdResponse> => {
  const { data } = await httpClient.get<GetPostByIdResponse>(
    `/posts/${postId}`
  );

  return data;
};
