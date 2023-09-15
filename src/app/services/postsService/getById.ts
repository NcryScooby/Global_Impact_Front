import { IPost } from '@interfaces/posts/IPost';
import { httpClient } from '../httpClient';

export interface GetPostByIdResponse {
  post: IPost;
  relatedPosts: IPost[];
}

export const getById = async (postId: string): Promise<GetPostByIdResponse> => {
  const { data } = await httpClient.get<GetPostByIdResponse>(`/posts/${postId}`);

  return data;
};
