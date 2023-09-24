import { httpClient } from '../httpClient';

export const deleteComment = async (commentId: string): Promise<void> => {
  await httpClient.delete(`/posts/comments/${commentId}`);
};
