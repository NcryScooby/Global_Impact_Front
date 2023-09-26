import { MySavedPostsResponse } from '@services/postsService/mySavedPost';
import { SavedPostsSkeleton } from '@components/skeletons/savedPosts';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { postsService } from '@services/postsService';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@hooks/useAuth';
import { Link } from 'react-router-dom';
import { env } from '@config/env';

export const SavedPosts = () => {
  const clientUrl = window.location.origin;
  const { userLogged } = useAuth();

  const { data, isFetching } = useQuery<MySavedPostsResponse>({
    queryKey: ['mySavedPosts'],
    queryFn: () => postsService.mySavedPost(),
  });

  if (!data || isFetching) {
    return <SavedPostsSkeleton />;
  }

  const savedPosts = data.savedPosts;

  return (
    <div className="sm:ml-64 h-full">
      <div>
        <Link
          to={`${clientUrl}/profile/${userLogged.user.username}`}
          className="absolute top-[55px] left-4 lg:top-8 lg:left-[334px] flex items-center gap-1.5"
        >
          <ArrowLeftIcon color="#757575" />
          <p className="text-xs text-gray-600">Back to profile</p>
        </Link>
      </div>
      <div className="mt-20">
        <div className="ml-4 lg:ml-20">
          <h1 className="text-3xl font-semibold text-primary dark:text-white font-system-ui">
            My saved posts
          </h1>
        </div>
        {savedPosts.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-2 mx-4 lg:mx-20 mt-4">
            {savedPosts.map(({ post }) => (
              <div key={post.id}>
                <Link to={`/posts/${post.id}`}>
                  <img
                    src={`${env.apiUrl}/uploads/posts/${post.image}`}
                    alt={post.image}
                    className="w-full h-72 object-cover object-top select-none"
                  />
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <h6 className="text-gray-700 dark:text-gray-400 text-sm ml-20 mt-4">
            You don&apos;t have any saved posts.
          </h6>
        )}
      </div>
    </div>
  );
};
