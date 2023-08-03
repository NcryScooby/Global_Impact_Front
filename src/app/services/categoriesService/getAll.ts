import { PaginationParams } from '../../interfaces/PaginationParams';
import { httpClient } from '../httpClient';

export interface GetAllCategoriesResponse {
  categories: [
    {
      id: string;
      name: string;
    }
  ];
}

export const getAll = async (
  params?: PaginationParams
): Promise<GetAllCategoriesResponse> => {
  const { data } = await httpClient.get<GetAllCategoriesResponse>(
    '/categories',
    {
      params,
    }
  );

  return data;
};
