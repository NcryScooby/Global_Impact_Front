import Card from '../ui/Card';

interface PostListProps {
  post: {
    id: string;
    title: string;
    content: string;
    image: string;
    likes: [];
    category: {
      name: string;
    };
    author: {
      name: string;
      job: {
        name: string;
      };
      avatar: string;
    };
    createdAt: string;
    views: number;
  };
}

export const PostList = ({ post }: PostListProps) => {
  return <Card post={post} />;
};
