interface PostListSkeletonProps {
  count?: number;
}

export const PostListSkeleton = ({ count }: PostListSkeletonProps) => {
  return Array.from({ length: count || 9 }).map((_, index) => (
    <div
      key={index}
      role="status"
      className="p-5 rounded-[2px] shadow animate-pulse bg-white w-full"
    >
      <div className="flex items-center justify-center h-52 mb-4 bg-gray-300"></div>
      <div className="flex items-center space-x-3">
        <svg
          className="w-10 h-10 text-gray-300 mt-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
        </svg>
        <div>
          <div className="h-3 w-36 bg-gray-300 rounded-sm mt-2" />
          <div className="h-3 w-40 bg-gray-300 rounded-sm mt-3" />
        </div>
      </div>
      <div className="h-4 bg-gray-300 rounded-sm mb-2.5 mt-[34px]"></div>
      <div className="h-3 bg-gray-300 rounded-sm mt-6"></div>
      <div className="h-3 bg-gray-300 rounded-sm mt-2"></div>
      <div className="h-4 bg-gray-300 rounded-sm w-44 mt-8"></div>
    </div>
  ));
};
