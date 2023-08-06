interface PostListSkeletonProps {
  count?: number;
}

export const PostListSkeleton = ({ count }: PostListSkeletonProps) => {
  return Array.from({ length: count || 9 }).map((_, index) => (
    <div
      key={index}
      role="status"
      className="max-w-sm p-5 rounded-[2px] shadow animate-pulse bg-white"
    >
      <div className="flex items-center justify-center h-52 mb-4 bg-gray-300 dark:bg-gray-300"></div>
      <div className="h-2 bg-gray-200 rounded-sm dark:bg-gray-300 w-40 mb-4 mt-6"></div>
      <div className="h-2 bg-gray-200 rounded-sm dark:bg-gray-300 mb-2.5 w-44"></div>
      <div className="h-4 bg-gray-200 rounded-sm dark:bg-gray-300 mb-2.5 mt-[34px]"></div>
      <div className="h-3 bg-gray-200 rounded-sm dark:bg-gray-300 mt-6"></div>
      <div className="h-3 bg-gray-200 rounded-sm dark:bg-gray-300 mt-2"></div>
      <div className="h-4 bg-gray-200 rounded-sm dark:bg-gray-300 w-44 mt-8"></div>
    </div>
  ));
};
