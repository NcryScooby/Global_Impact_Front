import { IRole } from './IRole';
import { IJob } from './IJob';

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
}
