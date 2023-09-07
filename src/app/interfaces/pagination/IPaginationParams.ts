export interface IPaginationParams {
  limit?: number;
  page?: number;
  orderBy?: 'desc' | 'asc' | 'popularity' | 'views';
}
