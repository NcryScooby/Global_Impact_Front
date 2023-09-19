import type { IPaginationParams } from '@interfaces/pagination/IPaginationParams';
import type { IGridOptions } from '@interfaces/pagination/IGridOptions';
import { useState, useRef, useCallback, ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { debounce } from '@utils/helpers/debounce';

export const usePostsLogic = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);

  const gridOptions: IGridOptions['value'][] = ['2', '3'];

  const paginationOptions: Required<Pick<IPaginationParams, 'orderBy'>>['orderBy'][] = [
    'desc',
    'asc',
    'popularity',
    'popularity',
  ];

  const getParamOrDefault = (param: string, defaultValue: string): string => {
    const value = searchParams.get(param);
    return value !== null ? value : defaultValue;
  };

  const searchTitleParam = getParamOrDefault('title', '');
  const searchPageParam = getParamOrDefault('page', '1');
  const searchOrderByParam = getParamOrDefault('orderBy', paginationOptions[0]) as Required<
    Pick<IPaginationParams, 'orderBy'>
  >['orderBy'];
  const searchGridParam = getParamOrDefault('grid', gridOptions[1]) as IGridOptions['value'];

  const [localTitle, setLocalTitle] = useState<string>(searchTitleParam);
  const [grid, setGrid] = useState<IGridOptions['value']>(searchGridParam || gridOptions[1]);

  const buildSearchParams = (params: {
    title?: string;
    grid?: IGridOptions['value'];
    orderBy?: string;
    page?: string;
  }) => {
    return {
      ...(params.title && { title: params.title }),
      ...(params.grid && params.grid !== gridOptions[1] && { grid: params.grid }),
      ...(params.orderBy && params.orderBy !== paginationOptions[0] && { orderBy: params.orderBy }),
      ...(params.page && params.page !== '1' && { page: params.page }),
    };
  };

  const handleTitleChangeDebounced = useCallback(
    debounce((title: string) => {
      setSearchParams(buildSearchParams({ title, grid }));
    }, 1000),
    [grid]
  );

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const title = event.target.value;
    setLocalTitle(title);
    handleTitleChangeDebounced(title);
  };

  const handleChangeSelectedOption = (event: ChangeEvent<HTMLSelectElement>) => {
    setSearchParams(
      buildSearchParams({
        title: searchTitleParam,
        grid,
        orderBy: event.target.value,
        page: searchPageParam,
      })
    );
  };

  const handleGridChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newGridValue = event.target.value as IGridOptions['value'];
    setSearchParams(
      buildSearchParams({
        title: searchTitleParam,
        grid: newGridValue,
        orderBy: searchOrderByParam,
        page: searchPageParam,
      })
    );
    setGrid(newGridValue);
  };

  const handlePageChange = (page: string) => {
    setSearchParams(
      buildSearchParams({
        title: searchTitleParam,
        grid,
        orderBy: searchOrderByParam,
        page,
      })
    );
  };

  return {
    inputRef,
    localTitle,
    searchPageParam,
    searchTitleParam,
    searchOrderByParam,
    grid,
    handleTitleChange,
    handlePageChange,
    handleChangeSelectedOption,
    handleGridChange,
  };
};
