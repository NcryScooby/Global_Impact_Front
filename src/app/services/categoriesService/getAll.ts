import type { IPaginationParams } from '@interfaces/pagination/IPaginationParams';
import type { ICategory } from '@interfaces/posts/ICategory';
import { httpClient } from '../httpClient';

export interface GetAllCategoriesResponse {
  categories: ICategory[];
}

export const getAll = async (params?: IPaginationParams): Promise<GetAllCategoriesResponse> => {
  const { data } = await httpClient.get<GetAllCategoriesResponse>('/categories', {
    params,
  });

  return data;
};
