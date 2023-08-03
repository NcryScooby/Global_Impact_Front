import { PaginationParams } from '../../interfaces/PaginationParams';
import { httpClient } from '../httpClient';

export interface GetAllJobsResponse {
  jobs: [
    {
      id: string;
      name: string;
    }
  ];
}

export const getAll = async (
  params?: PaginationParams
): Promise<GetAllJobsResponse> => {
  const { data } = await httpClient.get<GetAllJobsResponse>('/jobs', {
    params,
  });

  return data;
};
