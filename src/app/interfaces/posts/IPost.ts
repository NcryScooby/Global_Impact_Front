import { ICategory } from './ICategory';
import { IComment } from './IComment';
import { ILikes } from './ILikes';
import { IUser } from './IUser';

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
