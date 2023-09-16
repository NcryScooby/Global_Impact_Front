import { IPost } from '@interfaces/posts/IPost';
import Card from '@components/ui/Card';

interface PostShowcaseProps {
  posts: IPost[];
  title: string;
  description: string;
}

export const PostShowcase = ({ posts, title, description }: PostShowcaseProps) => {
  return (
    <>
      {posts && posts.length > 0 ? (
        <div className="sm:ml-64">
          {posts.length > 0 ? (
            <>
              {title === 'Related Posts' ? (
                <span className="border-b-[1px] mx-auto border-gray-300 dark:border-black-500 block w-[675px] mt-28" />
              ) : null}
              <h2 className="flex justify-center font-semibold text-lg font-inter mt-28 dark:text-gray-400">
                {title}
              </h2>
              <span className="flex justify-center text-[12px] text-gray-500 dark:text-gray-400">
                {description}
              </span>
            </>
          ) : null}
          <div className={`px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-${posts.length} my-8 gap-8`}>
            {posts.map((post, index) => (
              <Card post={post} key={index} />
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};
