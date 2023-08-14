export const PostDetailSkeleton = () => {
  return (
    <div
      role="status"
      className="p-5 px-4 mx-auto animate-pulse lg:py-16 lg:px-64"
    >
      <div className="h-3.5 w-full bg-gray-300 rounded-sm mt-1" />
      <div className="mt-[3.25rem] h-[12.25rem] w-[336px] lg:h-80 lg:w-[672px] lg:mt-10 bg-gray-300" />
      <div className="flex items-center mt-6 space-x-3">
        <svg
          className="w-12 h-12 text-gray-300 mt-1"
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
      <div>
        <div className="mt-10 col-span-2">
          <div className="h-7 bg-gray-300 rounded-sm mt-[16px]" />
          <div className="h-7 lg:w-56 bg-gray-300 rounded-sm mt-[8px]" />
        </div>
        <div className="h-3 mt-12 bg-gray-300 rounded-sm lg:mt-10" />
        <div className="h-3 bg-gray-300 rounded-sm mt-2" />
        <div className="h-3 bg-gray-300 rounded-sm mt-2" />
        <div className="h-3 bg-gray-300 rounded-sm mt-2" />
        <div className="h-3 bg-gray-300 rounded-sm mt-2" />
        <div className="h-3 bg-gray-300 rounded-sm mt-2" />
        <div className="h-3 bg-gray-300 rounded-sm mt-2" />
        <div className="h-3 bg-gray-300 rounded-sm mt-2" />
        <div className="h-3 bg-gray-300 rounded-sm mt-2" />
      </div>
    </div>
  );
};
