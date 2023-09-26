interface SavedPostsSkeletonProps {
  count?: number;
}

export const SavedPostsSkeleton = ({ count }: SavedPostsSkeletonProps) => {
  return (
    <div className="sm:ml-64">
      {Array.from({ length: count || 3 }).map((_, index) => (
        <div key={index} role="status" className={`${index !== 0 ? 'shadow' : null} animate-pulse`}>
          {index === 0 && (
            <div className="bg-gray-300 dark:bg-black-500 w-56 h-8 mt-[84px] ml-4 lg:ml-20" />
          )}
          <div
            className={`grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-2 mx-4 lg:mx-20 ${
              index === 0 ? 'mt-4' : 'mt-2'
            }`}
          >
            <div className="bg-gray-300 dark:bg-black-500 w-full h-72" />
            <div className="bg-gray-300 dark:bg-black-500 w-full h-72" />
            <div className="bg-gray-300 dark:bg-black-500 w-full h-72" />
          </div>
        </div>
      ))}
    </div>
  );
};
