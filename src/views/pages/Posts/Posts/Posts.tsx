import { GetAllPostsResponse } from '../../../../app/services/postsService/getAll';
import { postsService } from '../../../../app/services/postsService';
import { usePostsLogic } from '../../../../app/hooks/usePostsLogic';
import { PostLayout } from '../../../layouts/PostLayout';
import { useQuery } from '@tanstack/react-query';

export const Posts = () => {
  const {
    inputRef,
    localTitle,
    grid,
    searchPageParam,
    searchTitleParam,
    searchOrderByParam,
    handleTitleChange,
    handlePageChange,
    handleChangeSelectedOption,
    handleGridChange,
  } = usePostsLogic();

  const {
    data: posts,
    error,
    isFetching,
    isSuccess,
  } = useQuery<GetAllPostsResponse>({
    queryKey: ['getPosts', searchPageParam, searchTitleParam, searchOrderByParam],
    queryFn: () =>
      postsService.getAll({
        orderBy: searchOrderByParam,
        limit: 6,
        title: searchTitleParam || undefined,
        page: Number(searchPageParam) || undefined,
      }),
    keepPreviousData: true,
  });

  return (
    <>
      <PostLayout
        posts={posts}
        error={error}
        isLoading={isFetching}
        isSuccess={isSuccess}
        inputRef={inputRef}
        localTitle={localTitle}
        searchPageParam={searchPageParam}
        handleTitleChange={handleTitleChange}
        handlePageChange={handlePageChange}
        key={searchPageParam}
        page="posts"
        selectedOption={searchOrderByParam}
        handleChangeSelectedOption={handleChangeSelectedOption}
        grid={grid}
        handleGridChange={handleGridChange}
      />
    </>
  );
};
