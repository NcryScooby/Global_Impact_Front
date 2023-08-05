import { httpClient } from '../httpClient';

export interface CreateLikeData {
  postId: string;
}

export interface LikeResponse {
  message: string;
}

export const like = async (body: CreateLikeData): Promise<LikeResponse> => {
  const { data } = await httpClient.post<LikeResponse>('/posts/likes', body);

  return data;
};
