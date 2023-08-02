import { httpClient } from '../httpClient';

export interface Category {
  categories: [
    {
      id: string;
      name: string;
    }
  ];
}

interface CategoriesParams {
  limit?: number;
  page?: number;
  orderBy?: 'asc' | 'desc';
}

export const getAll = async (params?: CategoriesParams) => {
  const { data } = await httpClient.get<Category>('/categories', {
    params,
  });

  return data;
};
