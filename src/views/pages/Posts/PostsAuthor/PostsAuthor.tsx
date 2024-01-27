import { getAllByAuthorIdPostsResponse } from '@services/postsService/getAllPostByAuthorId';
import { postsService } from '@services/postsService';
import { usePostsLogic } from '../../../../app/hooks/usePostsLogic';
import { useQuery } from '@tanstack/react-query';
import { PostLayout } from '@layouts/PostLayout';
import { useParams } from 'react-router-dom';
import { CACHE_TIME } from '@constants';

export const PostsAuthor = () => {
  const { authorId } = useParams() as { authorId: string };

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
  } = useQuery<getAllByAuthorIdPostsResponse>({
    queryKey: [
      'getPostsByAuthorId',
      authorId,
      searchPageParam,
      searchTitleParam,
      searchOrderByParam,
    ],
    queryFn: () =>
      postsService.getAllByAuthorId(authorId, {
        orderBy: searchOrderByParam,
        limit: 6,
        title: searchTitleParam || undefined,
        page: Number(searchPageParam) || undefined,
      }),
    keepPreviousData: true,
    staleTime: CACHE_TIME.FIFTEEN_MINUTES,
  });

  return (
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
      page="author"
      selectedOption={searchOrderByParam}
      handleChangeSelectedOption={handleChangeSelectedOption}
      grid={grid}
      handleGridChange={handleGridChange}
    />
  );
};
