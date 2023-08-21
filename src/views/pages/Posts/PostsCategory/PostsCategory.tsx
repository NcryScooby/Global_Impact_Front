import { GetAllByCategoryIdPostsResponse } from '../../../../app/services/postsService/getAllByCategoryId';
import { postsService } from '../../../../app/services/postsService';
import { usePostsLogic } from '../../../../app/hooks/usePostsLogic';
import { PostLayout } from '../../../layouts/PostLayout';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export const PostsCategory = () => {
  const { categoryId } = useParams() as { categoryId: string };

  const {
    inputRef,
    localTitle,
    searchPageParam,
    searchTitleParam,
    handleTitleChange,
    handlePageChange,
  } = usePostsLogic();

  const {
    data: posts,
    error,
    isFetching,
    isSuccess,
  } = useQuery<GetAllByCategoryIdPostsResponse>({
    queryKey: ['getPostsByCategoryId', searchPageParam, searchTitleParam, categoryId],
    queryFn: () =>
      postsService.getAllByCategoryId(categoryId, {
        orderBy: 'desc',
        limit: 6,
        title: searchTitleParam || undefined,
        page: Number(searchPageParam) || undefined,
      }),
    keepPreviousData: true,
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
      screen="categories"
    />
  );
};
