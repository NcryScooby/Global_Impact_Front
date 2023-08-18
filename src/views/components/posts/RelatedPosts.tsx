import Card from '../ui/Card';

interface RelatedPostsProps {
  relatedPosts: {
    id: string;
    title: string;
    content: string;
    image: string;
    likes: [];
    category: {
      id: string;
      name: string;
    };
    author: {
      id: string;
      name: string;
      email: string;
      job: {
        id: string;
        name: string;
      };
      avatar: string;
    };
    createdAt: string;
    views: number;
  }[];
}

export const RelatedPosts = ({ relatedPosts }: RelatedPostsProps) => {
  return (
    <>
      {relatedPosts && relatedPosts.length > 0 ? (
        <div className="sm:ml-64">
          {relatedPosts.length > 0 ? (
            <>
              <span className="border-b-[1px] mx-auto border-gray-300 block w-[675px] mt-28" />
              <h2 className="flex justify-center mr-1 font-semibold text-lg font-inter mt-28">
                Related posts
              </h2>
              <span className="flex justify-center text-[12px] text-gray-500">
                See some similar posts
              </span>
            </>
          ) : null}
          <div
            className={`px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-${relatedPosts.length} my-8 gap-8`}
          >
            {relatedPosts.map((post, index) => (
              <Card post={post} key={index} />
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};
