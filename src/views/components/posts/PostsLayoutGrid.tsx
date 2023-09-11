import { GetAllByCategoryIdPostsResponse } from '@services/postsService/getAllByCategoryId';
import { getAllByAuthorIdPostsResponse } from '@services/postsService/getAllPostByAuthorId';
import { PostListSkeleton } from '@components/skeletons/posts/PostListSkeleton';
import { GetAllPostsResponse } from '@services/postsService/getAll';
import { PostNotFound } from '@components/animations/PostNotFound';
import { PostList } from './PostList';

interface PostsGridProps<
  T extends getAllByAuthorIdPostsResponse | GetAllByCategoryIdPostsResponse | GetAllPostsResponse
> {
  isLoading: boolean;
  error: unknown;
  posts: T | undefined;
}

// prettier-ignore
export const PostsGrid = <
  T extends
    | getAllByAuthorIdPostsResponse
    | GetAllByCategoryIdPostsResponse
    | GetAllPostsResponse
>({
    isLoading,
    error,
    posts,
  }: PostsGridProps<T>) => {
  if (isLoading && !error) {
    return <PostListSkeleton count={6} />;
  }

  if (error) {
    return (
      <div>
        <PostNotFound />
      </div>
    );
  }

  return posts?.posts.map((post) => <PostList key={post.id} post={post} />);
};
