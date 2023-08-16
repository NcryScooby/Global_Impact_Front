import Card from '../ui/Card';

interface PostListProps {
  post: {
    id: string;
    title: string;
    content: string;
    image: string;
    likes: [];
    category: {
      id: string;
      name: string;
    };
    author: {
      id: string;
      name: string;
      email: string;
      job: {
        id: string;
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
