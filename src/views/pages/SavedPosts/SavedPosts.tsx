import { MySavedPostsResponse } from '@services/postsService/mySavedPost';
import { SavedPostsSkeleton } from '@components/skeletons/savedPosts';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { postsService } from '@services/postsService';
import { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@components/ui/Button';
import { useAuth } from '@hooks/useAuth';
import { Link } from 'react-router-dom';

export const SavedPosts = () => {
  const { userLogged } = useAuth();

  const [savedPosts, setSavedPosts] = useState<MySavedPostsResponse['savedPosts'] | []>([]);
  const [page, setPage] = useState(1);
  const prevPageRef = useRef<number>(0);

  const handleChangePage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const { data, isFetching } = useQuery<MySavedPostsResponse>({
    queryKey: ['mySavedPosts', page],
    queryFn: () =>
      postsService.mySavedPost({
        page: page,
        limit: 3,
      }),
  });

  useEffect(() => {
    if (data?.savedPosts && prevPageRef.current !== data.meta.currentPage) {
      if (isFetching) return;

      setSavedPosts((prevPosts) => [...prevPosts, ...data.savedPosts]);
      prevPageRef.current = data.meta.currentPage;
    }
  }, [data, isFetching]);

  if (!data || isFetching) {
    return <SavedPostsSkeleton />;
  }

  return (
    <div className="sm:ml-64 h-screen">
      <Link
        to={`/profile/${userLogged.user.username}`}
        className="absolute top-[55px] left-4 lg:top-8 lg:left-[334px] flex items-center gap-1.5"
      >
        <ArrowLeftIcon color="#757575" />
        <p className="text-xs text-gray-600">Back to profile</p>
      </Link>
      <div className="mt-20">
        <div className="ml-4 lg:ml-20">
          <h1 className="text-3xl font-semibold text-primary dark:text-white font-system-ui">
            My saved posts
          </h1>
        </div>
        {savedPosts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-2 mx-4 lg:mx-20 mt-4">
              {savedPosts.map(({ post }) => (
                <div key={post.id}>
                  <Link to={`/posts/${post.id}`}>
                    <img
                      loading="lazy"
                      src={`${post.image}`}
                      alt={post.image}
                      className="w-full h-72 object-cover object-top select-none"
                    />
                  </Link>
                </div>
              ))}
            </div>
            {data.meta.currentPage === data.meta.totalPages ? null : (
              <div className="flex justify-center items-center mt-4">
                <Button onClick={handleChangePage} className="bg-white text-primary mt-4">
                  Load more
                </Button>
              </div>
            )}
          </>
        ) : (
          <h6 className="text-gray-700 dark:text-gray-400 text-sm ml-20 mt-4">
            You don&apos;t have any saved posts.
          </h6>
        )}
      </div>
    </div>
  );
};
