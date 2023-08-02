import { httpClient } from '../httpClient';

export interface Post {
  title: string;
  content: string;
  categoryId: string;
  image: FileList | null;
  tags?: string;
}

export interface PostResponse {
  post: {
    id: string;
    title: string;
    content: string;
    image: string | null;
    tags: string[] | [];
    createdAt: string;
    authorId: string;
    categoryId: string;
  };
}

export const create = async (body: Post) => {
  const { data } = await httpClient.post<PostResponse>('/posts', body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};
