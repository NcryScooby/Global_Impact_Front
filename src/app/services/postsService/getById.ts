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
        id: string;
        author: {
          id: string;
          name: string;
          avatar: string;
          job: {
            id: string;
            name: string;
          };
        };
        content: string;
        createdAt: string;
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
    likes: [];
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
  }[];
}

export const getById = async (postId: string): Promise<GetPostByIdResponse> => {
  const { data } = await httpClient.get<GetPostByIdResponse>(
    `/posts/${postId}`
  );

  return data;
};
