import { ArrowLeftIcon, MagnifyingGlassIcon, GridIcon, TableIcon } from '@radix-ui/react-icons';
import { getAllByAuthorIdPostsResponse } from '@services/postsService/getAllPostByAuthorId';
import { GetAllByCategoryIdPostsResponse } from '@services/postsService/getAllByCategoryId';
import { ChangeEvent, RefObject, useCallback, useEffect } from 'react';
import { GetAllPostsResponse } from '@services/postsService/getAll';
import { FILTER_OPTIONS, PAGE, POSTS_TITLE_MAP } from '@constants';
import { IGridOptions } from '@interfaces/pagination/IGridOptions';
import { PostsHeader } from '@components/posts/PostLayoutHeader';
import { PostsGrid } from '@components/posts/PostsLayoutGrid';
import { IPostPage } from '@interfaces/posts/IPostPage';
import { Button } from '@components/ui/Button';
import { Select } from '@components/ui/Select';
import { Input } from '@components/ui/Input';
import { useTheme } from '@hooks/useTheme';
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
  page: IPostPage['page'];
  selectedOption: string;
  grid?: IGridOptions['value'];
  handleTitleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handlePageChange: (page: string) => void;
  handleChangeSelectedOption: (event: ChangeEvent<HTMLSelectElement>) => void;
  handleGridChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
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
    page,
    selectedOption,
    grid,
    handleTitleChange,
    handlePageChange,
    handleChangeSelectedOption,
    handleGridChange
  }: PostLayoutProps<T>) => {

  const { theme } = useTheme();

  const isPostsPage = (page === PAGE.POSTS);
  const isCategoryPage = (page === PAGE.CATEGORY);
  const isAuthorPage = (page === PAGE.AUTHOR);

  const generateGridChangeHandler = useCallback((value: IGridOptions['value']) => {
    return () => {
      if (handleGridChange) {
        handleGridChange({ target: { value } } as ChangeEvent<HTMLSelectElement>);
      }
    };
  }, [handleGridChange]);

  const setHeaderTitle = useCallback(() => {
    if (isPostsPage) {
      for (const optionId in POSTS_TITLE_MAP) {
        if (selectedOption.includes(optionId)) {
          return POSTS_TITLE_MAP[optionId];
        }
      }
    } else if (isCategoryPage) {
      const { category } = posts?.posts[0] || {};
      if (category?.name) {
        return category.name;
      }
    } else if (isAuthorPage) {
      const { author } = posts?.posts[0] || {};
      if (author?.name) {
        return `${author.name}'s Posts`;
      }
    }
  }, [isPostsPage, isCategoryPage, isAuthorPage, selectedOption, posts]);

  useEffect(() => {
    if (!isLoading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isLoading]);

  return (
    <>
      <section className='sm:ml-64'>
        {!isPostsPage && (
          <Link
            to='/posts'
            className='absolute top-[55px] left-4 lg:top-8 lg:left-[289px] flex items-center gap-1.5'
          >
            <ArrowLeftIcon color='#757575' />
            <p className='text-xs text-gray-600'>Back to all posts</p>
          </Link>
        )}
        <div className='px-4 py-8 lg:py-16 mx-auto sm:px-6 lg:px-8 max-w-7xl'>
          <div className='flex items-start'>
            <PostsHeader isLoading={isLoading} isSuccess={isSuccess} setHeaderTitle={setHeaderTitle} />
            <div className='flex flex-col lg:items-end gap-4'>
              <Link to='/posts/create'>
                <Button type='button' className='hidden lg:block lg:h-[42px] lg:w-full dark:bg-black-500 hover:bg-gray-800 dark:hover:bg-black-400 h-[42px] text-sm text-normal items-center text-white'>
                  Create Post
                </Button>
              </Link>
            </div>
          </div>
          <div className='grid grid-cols-2 gap-2 lg:flex mt-12 justify-between items-center lg:mt-20'>
            <div>
              <Input
                name='title'
                placeholder='Search Post...'
                value={localTitle}
                onChange={handleTitleChange}
                className='w-full lg:w-72'
                iconStyle='top-[13px]'
                disabled={isLoading}
                ref={inputRef}
                icon={<MagnifyingGlassIcon />}
              />
            </div>
            <div className='lg:flex lg:gap-2'>
              <Select
                name='filters'
                placeholder='Filters'
                className={`w-full lg:w-36 ${isLoading ? 'text-gray-500' : 'text-black'}`}
                selectedOption={selectedOption}
                isSuccess={isSuccess}
                iconStyle='top-[11px] right-[-10px]'
                handleChangeSelectedOption={handleChangeSelectedOption}
                options={FILTER_OPTIONS}
                disabled={isLoading}
              />
              <div className='hidden lg:flex justify-between gap-1'>
                <div className={`p-3 bg-white dark:bg-black-600 dark:text-gray-400 rounded-[2px] border ${grid === '2' ? 'border-gray-400 dark:border-black-500' : 'border-gray-300 dark:border-transparent'} cursor-pointer`} onClick={generateGridChangeHandler('2')}>
                  <GridIcon />
                </div>
                <div className={`p-3 bg-white dark:bg-black-600 dark:text-gray-400 rounded-[2px] border ${grid !== '2' ? 'border-gray-400 dark:border-black-500' : 'border-gray-300 dark:border-transparent'} border-gray-300 cursor-pointer`} onClick={generateGridChangeHandler('3')}>
                  <TableIcon />
                </div>
              </div>
            </div>
          </div>
          <div className={`flex flex-col max-w-md gap-6 mx-auto mt-8 lg:grid ${grid !== '2' ? 'lg:grid-cols-3' : 'lg:grid-cols-2'} lg:max-w-full`}>
            <PostsGrid isLoading={isLoading} error={error} posts={posts} />
          </div>
        </div>
        <div className='flex items-center justify-center py-16'>
          {!error && (
            <Pagination
              count={posts?.meta.totalPages}
              page={Number(searchPageParam)}
              shape='rounded'
              sx={theme === 'light' ? null : {
                '& .MuiPaginationItem-root': {
                  color: 'white',
                  backgroundColor: '#111111',
                  '&.Mui-selected': {
                    backgroundColor: '#dbdbdb !important',
                    color: '#111111 !important',
                  }
                }
              }}
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
