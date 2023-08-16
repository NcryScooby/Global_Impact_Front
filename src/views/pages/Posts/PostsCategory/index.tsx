import { GetAllByCategoryIdPostsResponse } from '../../../../app/services/postsService/getAllByCategoryId';
import { PostListSkeleton } from '../../../components/skeletons/posts/PostListSkeleton';
import { MagnifyingGlassIcon, ArrowLeftIcon } from '@radix-ui/react-icons';
import { postsService } from '../../../../app/services/postsService';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { NotFound } from '../../../components/animations/NotFound';
import { useCallback, useEffect, useRef, useState } from 'react';
import { PostList } from '../../../components/posts/PostList';
import { debounce } from '../../../../app/hooks/UseDebounce';
import { Sidebar } from './../../../components/ui/Sidebar';
import { useAuth } from '../../../../app/hooks/UseAuth';
import { Input } from '../../../components/ui/Input';
import { useQuery } from '@tanstack/react-query';
import { Pagination } from '@mui/material';

export const PostsCategory = () => {
  const { signOut, userAvatar } = useAuth();
  const { categoryId } = useParams() as { categoryId: string };
  const [searchParams, setSearchParams] = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);

  const getParamOrDefault = (param: string, defaultValue: string): string => {
    const value = searchParams.get(param);
    return value !== null ? value : defaultValue;
  };

  const searchTitleParam = getParamOrDefault('title', '');
  const searchPageParam = getParamOrDefault('page', '1');

  const [localTitle, setLocalTitle] = useState<string>(searchTitleParam);

  const [posts, setPosts] = useState<GetAllByCategoryIdPostsResponse>();

  const { data, error, isFetching } = useQuery<GetAllByCategoryIdPostsResponse>(
    {
      queryKey: [
        'getPostsByCategoryId',
        searchPageParam,
        searchTitleParam,
        categoryId,
      ],
      queryFn: () =>
        postsService.getAllByCategoryId(categoryId, {
          orderBy: 'desc',
          limit: 6,
          title: searchTitleParam || undefined,
          page: Number(searchPageParam) || undefined,
        }),
      keepPreviousData: false,
    }
  );

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
      <Sidebar signOut={signOut} userAvatar={userAvatar} />
      <section className="bg-gray-50 sm:ml-64">
        <Link
          to={'/posts'}
          className="absolute top-8 left-[289px] flex items-center gap-1.5"
        >
          <ArrowLeftIcon color="#757575" />
          <p className="text-xs text-gray-600">Back to all posts</p>
        </Link>
        <div className="px-4 py-16 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex-row lg:flex lg:items-center lg:justify-between">
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
                {!isFetching && posts ? (
                  posts.posts[0].category.name
                ) : (
                  <div className="h-12 w-96 bg-gray-300 rounded-sm"></div>
                )}
              </h2>
              <p className="max-w-xl mx-auto mt-4 text-[14px] leading-relaxed text-gray-500 lg:mx-0">
                Keep up with the latest world news, all current affairs and
                coverage. News of the day, photos and videos. Be the first to
                know.
              </p>
            </div>
            <Input
              name="title"
              placeholder="Search Post..."
              value={localTitle}
              onChange={handleTitleChange}
              className="w-full lg:w-72"
              disabled={isFetching}
              ref={inputRef}
              icon={<MagnifyingGlassIcon />}
            />
          </div>
          <div className="grid max-w-md grid-cols-1 gap-6 mx-auto mt-8 lg:mt-16 lg:grid-cols-3 lg:max-w-full">
            {isFetching && !error && <PostListSkeleton count={6} />}
            {error ? (
              <div>
                <NotFound />
              </div>
            ) : (
              !isFetching &&
              posts &&
              posts.posts.map((post) => (
                <PostList
                  key={post.id}
                  post={{
                    id: post.id,
                    title: post.title,
                    content: post.content,
                    image: post.image,
                    likes: post.likes,
                    category: {
                      id: post.category.id,
                      name: post.category.name,
                    },
                    author: {
                      id: post.author.id,
                      name: post.author.name,
                      email: post.author.email,
                      job: {
                        id: post.author.job.id,
                        name: post.author.job.name,
                      },
                      avatar: post.author.avatar,
                    },
                    createdAt: post.createdAt,
                    views: post.views,
                  }}
                />
              ))
            )}
          </div>
        </div>
        <div className="flex items-center justify-center py-16">
          {!error ? (
            <Pagination
              count={posts?.meta.totalPages}
              page={Number(searchPageParam)}
              shape="rounded"
              disabled={isFetching}
              onChange={(_, page) => {
                handlePageChange(page.toString());
              }}
            />
          ) : null}
        </div>
      </section>
    </>
  );
};
