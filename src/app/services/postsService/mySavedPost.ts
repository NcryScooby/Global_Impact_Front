import type { IMeta } from '@interfaces/pagination/IMeta';
import type { IPost } from '@interfaces/posts/IPost';
import { httpClient } from '../httpClient';

export interface MySavedPostsResponse {
  savedPosts: {
    post: IPost;
  }[];
  meta: IMeta;
}

export const mySavedPost = async (): Promise<MySavedPostsResponse> => {
  const { data } = await httpClient.get<MySavedPostsResponse>('/posts/saved-posts/me');

  return data;
};
