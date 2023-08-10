import { addThreeDots } from '../../../app/utils/functions/addThreeDots';
import { formatDate } from '../../../app/utils/functions/formatDate';
import { env } from '../../../app/config/env';
import { Link } from 'react-router-dom';
import { BarChartIcon, HeartFilledIcon } from '@radix-ui/react-icons';

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
    };
    createdAt: string;
    views: number;
  };
}

export const PostList = ({ post }: PostListProps) => {
  return (
    <div className="overflow-hidden bg-white rounded-[2px] shadow">
      <div className="p-5">
        <div className="relative">
          <Link to={`/posts/${post.id}`}>
            <img
              className="object-cover h-52 mx-auto select-none"
              src={`${env.apiUrl}/uploads/posts/${post.image}`}
              alt={post.title}
            />
          </Link>

          <div className="absolute top-4 left-4">
            <span className="px-4 py-2 text-xs font-semibold tracking-widest text-gray-900 uppercase bg-white rounded-full">
              {post.category.name}
            </span>
          </div>
        </div>
        <div className="mt-6 flex justify-between items-start">
          <div>
            <span className="block text-[12px] text-gray-600 uppercase">
              {formatDate(post.createdAt)}
            </span>
            <span className="text-gray-600 text-[12px] font-normal">
              <b>{post.author.name}</b>, {post.author.job.name}.
            </span>
          </div>
          <div className="flex gap-2 select-none">
            <span className="flex items-center gap-1 text-[12px] font-light text-[#4b5563]">
              <BarChartIcon height={12} width={12} color="#4b5563" />
              <p>
                {post.views > 1000
                  ? `${(post.views / 1000).toFixed(1)}k`
                  : post.views}
              </p>
            </span>
            <span className="flex items-center gap-1 text-[12px] font-light text-[#4b5563]">
              <HeartFilledIcon height={12} width={12} color="#9e9e9e" />
              <p>{post.likes ? post.likes.length : 0}</p>
            </span>
          </div>
        </div>
        <p className="mt-5 text-[18px] leading-7 font-semibold">
          {post.title.length > 30 ? addThreeDots(post.title, 30) : post.title}
        </p>
        <p className="mt-4 text-[14px] text-gray-600">
          {post.content.length > 80
            ? addThreeDots(post.content, 80)
            : post.content}
        </p>
        <Link
          to={`/posts/${post.id}`}
          title={post.title}
          className="inline-flex items-center justify-center pb-0.5 mt-5 text-[14px] font-semibold text-blue-600 transition-all duration-200 border-b-2 border-transparent hover:border-blue-600 focus:border-blue-600"
        >
          Continue Reading
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};
