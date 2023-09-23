import type { ISavedPost } from './ISavedPost';
import type { IRole } from './IRole';
import type { IJob } from './IJob';

export interface IUser {
  id: string;
  username: string;
  name: string;
  email: string;
  avatar: string;
  job: IJob;
  role: IRole;
  joinedAt: string;
  countryOfBirth: string;
  bio: string;
  savedPosts: ISavedPost[];
}
