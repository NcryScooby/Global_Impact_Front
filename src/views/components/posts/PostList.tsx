import type { IPost } from '@interfaces/posts/IPost';
import Card from '@components/ui/Card';

interface PostListProps {
  post: IPost;
}

export const PostList = ({ post }: PostListProps) => {
  return <Card post={post} />;
};
