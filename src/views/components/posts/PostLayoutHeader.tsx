interface PostsHeaderProps {
  isLoading: boolean;
  isSuccess: boolean;
  setHeaderTitle: () => string | undefined;
}

export const PostsHeader = ({
  isLoading,
  isSuccess,
  setHeaderTitle,
}: PostsHeaderProps) => {
  let headerContent;

  if (!isLoading && isSuccess) {
    headerContent = setHeaderTitle();
  } else if (!isLoading && !isSuccess) {
    headerContent = 'Post not found';
  } else {
    headerContent = (
      <div className="h-[38px] w-64 lg:h-12 lg:w-96 bg-gray-300 rounded-sm" />
    );
  }

  return (
    <div className="flex-1 text-center lg:text-left">
      <h2 className="text-3xl text-start font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
        {headerContent}
      </h2>
      <p className="max-w-xl text-start mx-auto mt-4 text-[14px] leading-relaxed text-gray-500 lg:mx-0">
        Keep up with the latest world news, all current affairs and coverage.
        News of the day, photos, and videos. Be the first to know.
      </p>
    </div>
  );
};
