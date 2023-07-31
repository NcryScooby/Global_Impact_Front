import { SkeletonPostDetail } from '../../components/SkeletonPostDetail';
import { PostProps } from '../../../app/services/postsService/getById';
import { postsService } from '../../../app/services/postsService';
import { formatDate } from '../../../app/utils/formatDate';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../../app/hooks/useAuth';
import { Sidebar } from '../../components/Sidebar';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

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
        <div className="sm:ml-64 h-full">
          <SkeletonPostDetail />
        </div>
      </>
    );

  return (
    <>
      <Sidebar signOut={signOut} userName={userName} />
      <section className="py-10 h-full sm:py-16 lg:py-16 sm:ml-64">
        <div className="px-4 mx-auto sm:px-6 lg:px-8">
          <div className="md:text-center">
            <h2 className="w-full text-3xl text-left font-bold leading-tight text-black lg:text-5xl lg:leading-tight">
              {post.post.title}
            </h2>
          </div>

          <div className="flex flex-col mt-8 md:mt-16 gap-y-6 md:grid-cols-2 gap-x-10 relative">
            <div className="flex flex-col items-center">
              <img
                className="object-cover lg:max-h-80 lg:w-full"
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

              <div className="mt-2 w-full flex-col">
                <span className="block text-[12px] font-semibold text-gray-500 uppercase">
                  {formatDate(post.post.createdAt)}
                </span>
                <span className="text-gray-600 text-[12px] font-normal">
                  <b>{post.post.author.name}</b>, {post.post.author.job.name}.
                </span>
              </div>
            </div>

            <div>
              <p className="text-[16px]">{post.post.content}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
