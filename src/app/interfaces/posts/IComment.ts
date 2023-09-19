import type { IUser } from './IUser';

export interface IComment {
  id: string;
  author: IUser;
  content: string;
  createdAt: string;
}
