import { httpClient } from '../httpClient';

export interface GetPostByIdResponse {
  post: {
    id: string;
    title: string;
    content: string;
    image: string;
    tags: [];
    likes: [
      {
        id: string;
        authorId: string;
      }
    ];
    category: {
      id: string;
      name: string;
    };
    comments: [
      {
        author: {
          id: string;
          name: string;
          avatar: string;
          job: {
            name: string;
          };
        };
        content: string;
      }
    ];
    author: {
      id: string;
      name: string;
      email: string;
      avatar: string;
      job: {
        id: string;
        name: string;
      };
    };
    createdAt: string;
    views: number;
  };
  relatedPosts: {
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
  }[];
}

export const getById = async (postId: string): Promise<GetPostByIdResponse> => {
  const { data } = await httpClient.get<GetPostByIdResponse>(
    `/posts/${postId}`
  );

  return data;
};
