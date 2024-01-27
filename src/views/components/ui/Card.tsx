import { BarChartIcon, HeartFilledIcon } from '@radix-ui/react-icons';
import { addThreeDots } from '@utils/helpers/addThreeDots';
import { formatViews } from '@utils/helpers/formatViews';
import { formatDate } from '@utils/helpers/formatDate';
import type { IPost } from '@interfaces/posts/IPost';
import { useTheme } from '@hooks/useTheme';
import { Link } from 'react-router-dom';
import { Avatar } from '@mui/material';

interface CardProps {
  post: IPost;
}

const Card = ({ post }: CardProps) => {
  const { theme } = useTheme();
  return (
    <div className="overflow-hidden bg-white dark:bg-black-600 rounded-[2px] shadow">
      <div className="p-5">
        <div className="relative">
          <Link to={`/posts/${post.id}`}>
            <img
              loading="lazy"
              className="object-cover object-top h-52 mx-auto w-full select-none"
              src={`${post.image}`}
              alt={post.title}
            />
          </Link>
          <div className="absolute top-4 left-4">
            <Link to={`/posts/category/${post.category.id}`}>
              <span className="px-4 py-2 dark:bg-black-500 dark:text-white text-xs font-semibold tracking-widest text-gray-900 uppercase bg-white rounded-full">
                {post.category.name}
              </span>
            </Link>
          </div>
        </div>
        <div className="mt-6 flex justify-between items-start">
          <div className="flex items-center gap-2">
            <Link to={`/profile/${post.author.username}`}>
              <Avatar
                alt="User avatar"
                src={post.author.avatar ? `${post.author.avatar}` : ''}
                sx={{
                  width: 42,
                  height: 42,
                }}
              />
            </Link>
            <div>
              <span className="block text-[12px] text-gray-600 uppercase dark:text-gray-400">
                {formatDate(post.createdAt)}
              </span>
              <span className="text-gray-600 text-[12px] font-normal dark:text-gray-400">
                <b>{post.author.name}</b>, {post.author.job.name}.
              </span>
            </div>
          </div>
          <div className="flex gap-2 select-none">
            <span className="flex items-center gap-1 text-[12px] font-light text-[#4b5563] dark:text-gray-400">
              <BarChartIcon
                height={12}
                width={12}
                color={theme === 'light' ? '#4b5563' : '#bdbdbd'}
              />
              <p>{formatViews(post.views)}</p>
            </span>
            <span className="flex items-center gap-1 text-[12px] font-light text-[#4b5563] dark:text-gray-400">
              <HeartFilledIcon
                height={12}
                width={12}
                color={theme === 'light' ? '#9e9e9e' : '#bdbdbd'}
              />
              <p>{post.likes ? post.likes.length : 0}</p>
            </span>
          </div>
        </div>
        <p className="mt-5 text-[18px] leading-7 font-semibold dark:text-white">
          {addThreeDots(post.title, 30)}
        </p>
        <p className="mt-4 text-[14px] text-gray-600 dark:text-gray-400">
          {addThreeDots(post.content, 80)}
        </p>
        <Link
          to={`/posts/${post.id}`}
          title={post.title}
          className="inline-flex items-center justify-center pb-0.5 mt-5 text-[14px] font-semibold text-blue-600 transition-all duration-200 border-b-2 border-transparent hover:border-blue-600 focus:border-blue-600 dark:text-gray-400 dark:focus:border-gray-400 dark:hover:border-gray-400"
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

export default Card;
