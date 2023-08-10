import { httpClient } from '../httpClient';

export interface DeletePostData {
  commentId: string;
}

export const deleteComment = async (commentId: string): Promise<void> => {
  await httpClient.delete(`/posts/comments/${commentId}`);
};
