import { httpClient } from '../httpClient';

export interface CreateSavedPostData {
  postId: string;
}

export interface SavedPostResponse {
  message: 'Post Saved' | 'Post Discarded';
}

export const savedPost = async (body: CreateSavedPostData): Promise<SavedPostResponse> => {
  const { data } = await httpClient.post<SavedPostResponse>('/posts/saved-posts', body);

  return data;
};
