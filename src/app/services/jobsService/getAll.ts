import { IPaginationParams } from '@interfaces/pagination/IPaginationParams';
import { httpClient } from '../httpClient';

export interface GetAllJobsResponse {
  jobs: {
    id: string;
    name: string;
  }[];
}

export const getAll = async (params?: IPaginationParams): Promise<GetAllJobsResponse> => {
  const { data } = await httpClient.get<GetAllJobsResponse>('/jobs', {
    params,
  });

  return data;
};
