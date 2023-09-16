export const ProfileSkeleton = () => {
  return (
    <div
      role="status"
      className="mt-2 lg:mt-0 p-5 px-4 mx-auto animate-pulse lg:py-16 lg:px-64 flex flex-col items-center justify-center"
    >
      <div className="h-10 w-80 bg-gray-300 dark:bg-black-500 rounded-sm mt-8" />
      <svg
        className="w-24 h-24 text-gray-300 dark:text-black-500 mt-12"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
      </svg>
      <div className="mt-6 flex flex-col items-center">
        <div className="h-5 w-56 bg-gray-300 dark:bg-black-500 rounded-sm" />
        <div className="h-3 w-64 bg-gray-300 dark:bg-black-500 rounded-sm mt-[8px]" />
      </div>
      <div className="mt-[33px] flex gap-4">
        <div className="h-5 w-24 bg-gray-300 dark:bg-black-500 rounded-sm" />
        <div className="h-5 w-24 bg-gray-300 dark:bg-black-500 rounded-sm" />
      </div>
      <span className="border-b-[1px] border-gray-300 dark:border-black-500 block w-[675px] mx-auto my-10" />
      <div className="mt-1 flex flex-col gap-1">
        <div className="h-5 w-56 bg-gray-300 dark:bg-black-500 rounded-sm" />
        <div className="h-4 w-56 bg-gray-300 dark:bg-black-500 rounded-sm" />
      </div>
      <div className="mt-11 flex flex-col gap-2 items-center">
        <div className="h-4 w-72 lg:w-[512px] bg-gray-300 dark:bg-black-500 rounded-sm" />
        <div className="h-4 w-72 lg:w-[512px] bg-gray-300 dark:bg-black-500 rounded-sm" />
        <div className="h-4 w-72 lg:w-[512px] bg-gray-300 dark:bg-black-500 rounded-sm" />
      </div>
    </div>
  );
};
