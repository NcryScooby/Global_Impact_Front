import { getAllByAuthorIdPostsResponse } from '../../../app/services/postsService/getAllPostByAuthorId';
import { GetAllByCategoryIdPostsResponse } from '../../../app/services/postsService/getAllByCategoryId';
import { GetAllPostsResponse } from '../../../app/services/postsService/getAll';
import { ArrowLeftIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { PostsHeader } from '../../components/posts/PostLayoutHeader';
import { PostsGrid } from '../../components/posts/PostsLayoutGrid';
import { ChangeEvent, RefObject, useEffect } from 'react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { PAGE } from '../../../app/constants';
import { Pagination } from '@mui/material';
import { Link } from 'react-router-dom';

interface PostLayoutProps<
  T extends getAllByAuthorIdPostsResponse | GetAllByCategoryIdPostsResponse | GetAllPostsResponse
> {
  posts: T | undefined;
  error: unknown;
  isLoading: boolean;
  isSuccess: boolean;
  inputRef: RefObject<HTMLInputElement>;
  localTitle: string;
  searchPageParam: string;
  handleTitleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handlePageChange: (page: string) => void;
  page: 'posts' | 'categories' | 'authors';
}

// prettier-ignore
export const PostLayout = <
  T extends
    | getAllByAuthorIdPostsResponse
    | GetAllByCategoryIdPostsResponse
    | GetAllPostsResponse
>({
    posts,
    error,
    isLoading,
    isSuccess,
    inputRef,
    localTitle,
    searchPageParam,
    handleTitleChange,
    handlePageChange,
    page,
  }: PostLayoutProps<T>) => {

  const isPostsPage = (page === PAGE.POSTS);
  const isCategoryPage = (page === PAGE.CATEGORIES);
  const isAuthorPage = (page === PAGE.AUTHORS);

  const setHeaderTitle = () => {
    if (isPostsPage) return 'Latest from blog';
    if (isCategoryPage && posts?.posts[0]?.category?.name) return posts.posts[0].category.name;
    if (isAuthorPage && posts?.posts[0]?.author?.name) return `${posts.posts[0].author.name}'s Posts`;
  };

  useEffect(() => {
    if (!isLoading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isLoading]);

  return (
    <>
      <section className="bg-gray-50 sm:ml-64">
        {!isPostsPage && (
          <Link
            to="/posts"
            className="absolute top-[55px] left-4 lg:top-8 lg:left-[289px] flex items-center gap-1.5"
          >
            <ArrowLeftIcon color="#757575" />
            <p className="text-xs text-gray-600">Back to all posts</p>
          </Link>
        )}
        <div className="px-4 py-8 lg:py-16 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex-row lg:flex lg:items-center lg:justify-between">
            <PostsHeader isLoading={isLoading} isSuccess={isSuccess} setHeaderTitle={setHeaderTitle} />
            <div className='flex flex-col lg:items-end gap-4'>
              <Input
                name="title"
                placeholder="Search Post..."
                value={localTitle}
                onChange={handleTitleChange}
                className="w-full lg:w-72"
                disabled={isLoading}
                ref={inputRef}
                icon={<MagnifyingGlassIcon />}
              />
              <Link to="/posts/create">
                <Button className='h-[42px] w-full'>
                  Create Post
                </Button>
              </Link>
            </div>
          </div>
          <div className="grid max-w-md grid-cols-1 gap-6 mx-auto mt-8 lg:mt-16 lg:grid-cols-3 lg:max-w-full">
            <PostsGrid isLoading={isLoading} error={error} posts={posts} />
          </div>
        </div>
        <div className="flex items-center justify-center py-16">
          {!error && (
            <Pagination
              count={posts?.meta.totalPages}
              page={Number(searchPageParam)}
              shape="rounded"
              disabled={isLoading}
              onChange={(_, page) => {
                handlePageChange(page.toString());
              }}
            />
          )}
        </div>
      </section>
    </>
  );
};
