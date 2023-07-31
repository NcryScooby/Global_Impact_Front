export const SkeletonPostDetail = () => {
  return (
    <div
      role="status"
      className="p-5 max-w-5xl px-4 mx-auto animate-pulse lg:py-14 lg:px-8 lg:grid lg:grid-cols-2"
    >
      <div className="mt-8 col-span-2 lg:w-80">
        <div className="h-5 bg-gray-200 rounded-sm dark:bg-gray-300 mt-[16px]" />
        <div className="h-5 bg-gray-200 rounded-sm dark:bg-gray-300 mt-[16px]" />
        <div className="h-5 bg-gray-200 rounded-sm dark:bg-gray-300 mt-[16px]" />
      </div>
      <div className="flex items-center justify-center h-[212px] mt-10 bg-gray-300 dark:bg-gray-300 lg:mt-16" />
      <div className="lg:mt-10">
        <div className="h-3 w-36 bg-gray-200 rounded-sm dark:bg-gray-300 mt-2" />
        <div className="h-3 w-40 bg-gray-200 rounded-sm dark:bg-gray-300 mt-3" />
        <div className="h-3 bg-gray-200 rounded-sm dark:bg-gray-300 mt-8" />
        <div className="h-3 bg-gray-200 rounded-sm dark:bg-gray-300 mt-2" />
        <div className="h-3 bg-gray-200 rounded-sm dark:bg-gray-300 mt-2" />
        <div className="h-3 bg-gray-200 rounded-sm dark:bg-gray-300 mt-2" />
      </div>
    </div>
  );
};
