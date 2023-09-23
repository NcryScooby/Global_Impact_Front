import { getAllByCategoryId } from './getAllByCategoryId';
import { getAllByAuthorId } from './getAllPostByAuthorId';
import { mySavedPost } from './mySavedPost';
import { deletePost } from './deletePost';
import { savedPost } from './savedPost';
import { getById } from './getById';
import { create } from './create';
import { getAll } from './getAll';
import { like } from './like';

export const postsService = {
  getAll,
  getById,
  getAllByCategoryId,
  getAllByAuthorId,
  create,
  like,
  deletePost,
  savedPost,
  mySavedPost,
};
