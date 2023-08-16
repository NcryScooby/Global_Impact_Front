import { httpClient } from '../httpClient';

export const deletePost = async (postId: string): Promise<void> => {
  await httpClient.delete(`/posts/${postId}`);
};
