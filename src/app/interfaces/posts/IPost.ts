import type { ICategory } from './ICategory';
import type { IComment } from './IComment';
import type { ILikes } from './ILikes';
import type { IUser } from './IUser';

export interface IPost {
  id: string;
  title: string;
  content: string;
  image: string;
  comments: IComment[] | [];
  likes: ILikes[] | [];
  category: ICategory;
  author: IUser;
  createdAt: string;
  views: number;
}
