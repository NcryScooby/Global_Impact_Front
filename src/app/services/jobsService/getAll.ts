import { IPaginationParams } from '@interfaces/pagination/IPaginationParams';
import { httpClient } from '../httpClient';
import { IJob } from '@interfaces/posts/IJob';

export interface GetAllJobsResponse {
  jobs: IJob[];
}

export const getAll = async (params?: IPaginationParams): Promise<GetAllJobsResponse> => {
  const { data } = await httpClient.get<GetAllJobsResponse>('/jobs', {
    params,
  });

  return data;
};
