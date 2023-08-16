import { getAllByAuthorId } from './getAllPostByAuthorId';
import { getAllByCategoryId } from './getAllByCategoryId';
import { getById } from './getById';
import { create } from './create';
import { getAll } from './getAll';
import { like } from './like';
import { deletePost } from './deletePost';

export const postsService = {
  getAll,
  getById,
  getAllByCategoryId,
  getAllByAuthorId,
  create,
  like,
  deletePost,
};
