import { PostListSkeleton } from '../../components/skeletons/posts/PostListSkeleton';
import { GetAllPostsResponse } from '../../../app/services/postsService/getAll';
import { postsService } from '../../../app/services/postsService';
import { PostList } from '../../components/ui/PostList';
import { Sidebar } from '../../components/ui/Sidebar';
import { useAuth } from '../../../app/hooks/UseAuth';
import { Input } from '../../components/ui/Input';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export const Posts = () => {
  const { signOut, userName } = useAuth();

  const [posts, setPosts] = useState<GetAllPostsResponse>();
  const [title, setTitle] = useState<string>('');

  const { data, isFetching } = useQuery<GetAllPostsResponse>({
    queryKey: ['getPosts'],
    queryFn: () => postsService.getAll({ orderBy: 'desc', limit: 9 }),
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (data) {
      setPosts(data);
    }
  }, [data]);

  return isFetching ? (
    <>
      <Sidebar signOut={signOut} userName={userName} />
      <section className="sm:ml-64">
        <div className="px-4 py-16 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex items-end justify-between">
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
                Latest from blog
              </h2>
              <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600 lg:mx-0">
                Keep up with the latest world news, all current affairs and
                coverage. News of the day, photos and videos. Be the first to
                know.
              </p>
            </div>
          </div>
          <div className="grid max-w-md grid-cols-1 gap-6 mx-auto mt-8 lg:mt-16 lg:grid-cols-3 lg:max-w-full">
            <PostListSkeleton count={9} />
          </div>
        </div>
      </section>
    </>
  ) : (
    <>
      <Sidebar signOut={signOut} userName={userName} />
      <section className="bg-gray-50 sm:ml-64">
        <div className="px-4 py-16 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center justify-between">
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
                Latest from blog
              </h2>
              <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600 lg:mx-0">
                Keep up with the latest world news, all current affairs and
                coverage. News of the day, photos and videos. Be the first to
                know.
              </p>
            </div>
            <div>
              <Input
                className="w-60"
                name="Title"
                type="text"
                placeholder="Search Post"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                onClick={() => {
                  postsService.getAll({ orderBy: 'desc', limit: 9, title });
                }}
              />
            </div>
          </div>
          <div className="grid max-w-md grid-cols-1 gap-6 mx-auto mt-8 lg:mt-16 lg:grid-cols-3 lg:max-w-full">
            {posts &&
              posts.posts.map((post) => (
                <PostList
                  key={post.id}
                  post={{
                    id: post.id,
                    title: post.title,
                    content: post.content,
                    image: post.image,
                    category: {
                      name: post.category.name,
                    },
                    author: {
                      name: post.author.name,
                      job: {
                        name: post.author.job.name,
                      },
                    },
                    createdAt: post.createdAt,
                  }}
                />
              ))}
          </div>
        </div>
      </section>
    </>
  );
};
