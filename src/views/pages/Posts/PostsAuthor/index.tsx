import { getAllByAuthorIdPostsResponse } from '../../../../app/services/postsService/getAllPostByAuthorId';
import { postsService } from '../../../../app/services/postsService';
import { useParams, useSearchParams } from 'react-router-dom';
import { debounce } from '../../../../app/hooks/UseDebounce';
import { PostLayout } from '../../../layouts/PostLayout';
import { useCallback, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

export const PostsAuthor = () => {
  const { authorId } = useParams() as { authorId: string };
  const [searchParams, setSearchParams] = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);

  const getParamOrDefault = (param: string, defaultValue: string): string => {
    const value = searchParams.get(param);
    return value !== null ? value : defaultValue;
  };

  const searchTitleParam = getParamOrDefault('title', '');
  const searchPageParam = getParamOrDefault('page', '1');

  const [localTitle, setLocalTitle] = useState<string>(searchTitleParam);

  const {
    data: posts,
    error,
    isFetching,
    isSuccess,
  } = useQuery<getAllByAuthorIdPostsResponse>({
    queryKey: [
      'getPostsByAuthorId',
      searchPageParam,
      searchTitleParam,
      authorId,
    ],
    queryFn: () =>
      postsService.getAllByAuthorId(authorId, {
        orderBy: 'desc',
        limit: 6,
        title: searchTitleParam || undefined,
        page: Number(searchPageParam) || undefined,
      }),
    keepPreviousData: true,
  });

  const handleTitleChangeDebounced = useCallback(
    debounce((title: string) => {
      setSearchParams(title ? { title } : {});
    }, 1000),
    []
  );

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const title = event.target.value;
    setLocalTitle(title);
    handleTitleChangeDebounced(title);
  };

  const handlePageChange = (page: string) => {
    setSearchParams({
      ...(searchTitleParam && { title: searchTitleParam }),
      page,
    });
  };

  return (
    <PostLayout
      posts={posts}
      error={error}
      isFetching={isFetching}
      isSuccess={isSuccess}
      inputRef={inputRef}
      localTitle={localTitle}
      searchPageParam={searchPageParam}
      handleTitleChange={handleTitleChange}
      handlePageChange={handlePageChange}
      key={searchPageParam}
      screen="authors"
    />
  );
};
