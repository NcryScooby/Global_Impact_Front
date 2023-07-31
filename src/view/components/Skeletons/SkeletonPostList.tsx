interface SkeletonPostListProps {
  count?: number;
}

export const SkeletonPostList = ({ count }: SkeletonPostListProps) => {
  return Array.from({ length: count || 9 }).map((_, index) => (
    <div key={index} role="status" className="p-5 animate-pulse lg:p-0">
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
