import { GetAllPostsResponse } from '../../../../app/services/postsService/getAll';
import { postsService } from '../../../../app/services/postsService';
import { useCallback, useEffect, useRef, useState } from 'react';
import { debounce } from '../../../../app/hooks/UseDebounce';
import { PostLayout } from '../../../layouts/PostLayout';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

export const Posts = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);

  const getParamOrDefault = (param: string, defaultValue: string): string => {
    const value = searchParams.get(param);
    return value !== null ? value : defaultValue;
  };

  const searchTitleParam = getParamOrDefault('title', '');
  const searchPageParam = getParamOrDefault('page', '1');

  const [localTitle, setLocalTitle] = useState<string>(searchTitleParam);

  const [posts, setPosts] = useState<GetAllPostsResponse>();

  const { data, error, isFetching } = useQuery<GetAllPostsResponse>({
    queryKey: ['getPosts', searchPageParam, searchTitleParam],
    queryFn: () =>
      postsService.getAll({
        orderBy: 'desc',
        limit: 6,
        title: searchTitleParam || undefined,
        page: Number(searchPageParam) || undefined,
      }),
    keepPreviousData: false,
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

  useEffect(() => {
    setPosts(data);
  }, [data]);

  useEffect(() => {
    if (!isFetching && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFetching]);

  return (
    <>
      <PostLayout
        posts={posts}
        error={error}
        isFetching={isFetching}
        inputRef={inputRef}
        localTitle={localTitle}
        searchPageParam={searchPageParam}
        handleTitleChange={handleTitleChange}
        handlePageChange={handlePageChange}
        key={searchPageParam}
        screen="posts"
      />
    </>
  );
};
