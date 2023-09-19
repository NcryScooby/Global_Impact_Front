import type { IPaginationParams } from '@interfaces/pagination/IPaginationParams';
import type { IJob } from '@interfaces/posts/IJob';
import { httpClient } from '../httpClient';

export interface GetAllJobsResponse {
  jobs: IJob[];
}

export const getAll = async (params?: IPaginationParams): Promise<GetAllJobsResponse> => {
  const { data } = await httpClient.get<GetAllJobsResponse>('/jobs', {
    params,
  });

  return data;
};
