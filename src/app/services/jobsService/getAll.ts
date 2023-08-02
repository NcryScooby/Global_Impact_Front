import { httpClient } from '../httpClient';

export interface Job {
  jobs: [
    {
      id: string;
      name: string;
    }
  ];
}

interface JobsParams {
  limit?: number;
  page?: number;
  orderBy?: 'asc' | 'desc';
}

export const getAll = async (params?: JobsParams) => {
  const { data } = await httpClient.get<Job>('/jobs', {
    params,
  });

  return data;
};
