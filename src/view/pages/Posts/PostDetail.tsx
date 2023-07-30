import { postsService } from '../../../app/services/postsService';
import { useAuth } from '../../../app/hooks/useAuth';
import { Sidebar } from '../../components/Sidebar';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PostProps } from '../../../app/services/postsService/getById';
import { Spinner } from '../../components/Spinner';
import { formatDate } from '../../../app/utils/formatDate';

export const PostDetail = () => {
  const { postId } = useParams() as { postId: string };
  const { signOut, userName } = useAuth();
  const navigate = useNavigate();

  const [post, setPost] = useState<PostProps>();

  const { data, isError } = useQuery<PostProps>({
    queryKey: ['post', postId],
    queryFn: () => postsService.getById(postId),
    staleTime: 1000 * 60 * 5,
  });

  if (isError) {
    return navigate('/', { replace: true });
  }

  useEffect(() => {
    if (data) {
      setPost(data);
    }
  }, [data]);

  if (!post)
    return (
      <>
        <Sidebar signOut={signOut} userName={userName} />
        <div className="sm:ml-64 flex justify-center items-center h-full">
          <Spinner />
        </div>
      </>
    );

  return (
    <>
      <Sidebar signOut={signOut} userName={userName} />
      <section className="py-10 h-full sm:py-16 lg:py-24 sm:ml-64">
        <div className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
          <div className="md:max-w-lg lg:max-w-2xl md:text-center">
            <h2 className="text-3xl text-left font-bold leading-tight text-black sm:text-3xl lg:text-3xl lg:leading-tight w-96">
              {post.post.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 mt-8 md:mt-20 gap-y-6 md:grid-cols-2 gap-x-10 relative">
            <div>
              <img
                src={`${import.meta.env.VITE_API_URL}/uploads/posts/${
                  post?.post.image
                }`}
                alt={post.post.title}
              />

              <div className="absolute top-4 left-4">
                <span className="px-4 py-2 text-xs font-semibold tracking-widest text-gray-900 uppercase bg-white rounded-full">
                  {post.post.category.name}
                </span>
              </div>

              <div className="mt-2">
                <span className="block text-[12px] font-semibold text-gray-500 uppercase">
                  {formatDate(post.post.createdAt)}
                </span>
                <span className="text-gray-600 text-[12px] font-normal">
                  <b>{post.post.author.name}</b>, {post.post.author.job.name}.
                </span>
              </div>
            </div>

            <div>
              <p className="text-[14px] text-gray-600">{post.post.content}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
