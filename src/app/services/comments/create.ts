import { IComment } from '@interfaces/posts/IComment';
import { httpClient } from '../httpClient';

export interface CreateCommentData {
  content: string;
  postId: string;
}

export interface CreateCommentResponse {
  comment: IComment & {
    post: {
      id: string;
      title: string;
    };
  };
}

export const create = async (body: CreateCommentData): Promise<CreateCommentResponse> => {
  const { data } = await httpClient.post<CreateCommentResponse>('/posts/comments', body);

  return data;
};
