import { IPaginationParams } from '../../interfaces/pagination/IPaginationParams';
import { httpClient } from '../httpClient';

export interface GetAllCategoriesResponse {
  categories: {
    id: string;
    name: string;
  }[];
}

export const getAll = async (
  params?: IPaginationParams
): Promise<GetAllCategoriesResponse> => {
  const { data } = await httpClient.get<GetAllCategoriesResponse>(
    '/categories',
    {
      params,
    }
  );

  return data;
};
