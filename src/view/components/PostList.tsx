import { formatDate } from '../../app/utils/formatDate';

interface PostListProps {
  post: {
    title: string;
    content: string;
    image: string;
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
  };
}

export const PostList = ({ post }: PostListProps) => {
  return (
    <div className="overflow-hidden bg-white rounded shadow">
      <div className="p-5">
        <div className="relative">
          <a href="#" title="" className="block aspect-w-4 aspect-h-3">
            <img
              className="object-cover w-80 h-52"
              src={`${import.meta.env.VITE_API_URL}/uploads/posts/${
                post.image
              }`}
              alt={post.title}
            />
          </a>

          <div className="absolute top-4 left-4">
            <span className="px-4 py-2 text-xs font-semibold tracking-widest text-gray-900 uppercase bg-white rounded-full">
              {post.category.name}
            </span>
          </div>
        </div>
        <div className="flex items-center mt-6">
          <span className="block text-[12px] font-semibold text-gray-500 uppercase">
            {formatDate(post.createdAt)}
          </span>
          <span className="block mx-1 text-gray-500">•</span>
          <span className="text-gray-600 text-[12px] font-normal">
            <b>{post.author.name}</b>, {post.author.job.name}
          </span>
        </div>
        <p className="mt-5 text-[18px] leading-7 font-semibold">
          <a href="#" title="" className="text-black">
            {post.title.length > 30
              ? post.title.substring(0, 30) + '...'
              : post.title}
          </a>
        </p>
        <p className="mt-4 text-[14px] text-gray-600">
          {post.content.length > 80
            ? post.content.substring(0, 80) + '...'
            : post.content}
        </p>
        <a
          href="#"
          title=""
          className="inline-flex items-center justify-center pb-0.5 mt-5 text-base font-semibold text-blue-600 transition-all duration-200 border-b-2 border-transparent hover:border-blue-600 focus:border-blue-600"
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
        </a>
      </div>
    </div>
  );
};