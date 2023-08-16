import { getAllByAuthorIdPostsResponse } from '../../../app/services/postsService/getAllPostByAuthorId';
import { GetAllByCategoryIdPostsResponse } from '../../../app/services/postsService/getAllByCategoryId';
import { PostListSkeleton } from '../../components/skeletons/posts/PostListSkeleton';
import { GetAllPostsResponse } from '../../../app/services/postsService/getAll';
import { ArrowLeftIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { NotFound } from '../../components/animations/NotFound';
import { PostList } from '../../components/posts/PostList';
import { Input } from '../../components/ui/Input';
import { SCREEN } from '../../../app/constants';
import { Pagination } from '@mui/material';
import { Link } from 'react-router-dom';

interface PostLayoutProps<
  T extends
    | getAllByAuthorIdPostsResponse
    | GetAllByCategoryIdPostsResponse
    | GetAllPostsResponse
> {
  posts: T | undefined;
  error: unknown;
  isFetching: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  localTitle: string;
  searchPageParam: string;
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePageChange: (page: string) => void;
  screen: string;
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
    isFetching,
    inputRef,
    localTitle,
    searchPageParam,
    handleTitleChange,
    handlePageChange,
    screen,
  }: PostLayoutProps<T>) => {

  const isPostsScreen = (screen === SCREEN.POSTS);
  const isCategoryScreen = (screen === SCREEN.CATEGORIES);
  const isAuthorScreen = (screen === SCREEN.AUTHORS);

  const setHeaderTitle = () => {
    if (isPostsScreen) return 'Latest from blog';
    if (isCategoryScreen && posts?.posts[0]?.category?.name) return posts.posts[0].category.name;
    if (isAuthorScreen && posts?.posts[0]?.author?.name) return `${posts.posts[0].author.name}'s Posts`;
  };

  return (
    <>
      <section className="bg-gray-50 sm:ml-64">
        {!isPostsScreen ? <Link
          to={'/posts'}
          className="absolute top-20 left-4 lg:top-8 lg:left-[289px] flex items-center gap-1.5"
        >
          <ArrowLeftIcon color="#757575" />
          <p className="text-xs text-gray-600">Back to all posts</p>
        </Link> : null }
        <div className="px-4 py-16 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex-row lg:flex lg:items-center lg:justify-between">
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-3xl text-start font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
                {!isFetching ? (
                  posts && setHeaderTitle()
                ) : (
                  !isFetching && !posts ? 'Post not found' : <div className="h-[38px] w-64 lg:h-12 lg:w-96 bg-gray-300 rounded-sm"></div>
                )}
              </h2>
              <p className="max-w-xl text-start mx-auto mt-4 text-[14px] leading-relaxed text-gray-500 lg:mx-0">
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
              className="w-full lg:w-72 mt-6 lg:mt-0"
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
                  post={post}
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
