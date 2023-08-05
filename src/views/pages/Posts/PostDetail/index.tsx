import { PostDetailSkeleton } from '../../../components/skeletons/posts/PostDetailSkeleton';
import { GetPostByIdResponse } from '../../../../app/services/postsService/getById';
import { scrollToTop } from '../../../../app/utils/functions/scrollToTop';
import { formatDate } from '../../../../app/utils/functions/formatDate';
import { MeResponse } from '../../../../app/services/usersService/me';
import { BarChartIcon, HeartFilledIcon } from '@radix-ui/react-icons';
import { postsService } from '../../../../app/services/postsService';
import { useNavigate, useParams } from 'react-router-dom';
import { Sidebar } from '../../../components/ui/Sidebar';
import { useAuth } from '../../../../app/hooks/UseAuth';
import { useQuery } from '@tanstack/react-query';
import { env } from '../../../../app/config/env';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

export const PostDetail = () => {
  scrollToTop();
  const { postId } = useParams() as { postId: string };
  const { signOut, userName } = useAuth();
  const navigate = useNavigate();

  const [post, setPost] = useState<GetPostByIdResponse>();
  const [likesCount, setLikesCount] = useState(0);
  const [pulse, setPulse] = useState(false);
  const [liking, setLiking] = useState(false);

  const { data: user } = useQuery<MeResponse>({
    queryKey: ['loggedUser'],
    staleTime: Infinity,
  });

  const [color, setColor] = useState<'#9e9e9e' | '#f13636'>();

  useEffect(() => {
    const isLiked = post?.post.likes?.some(
      (like) => like.authorId === user?.user.id
    );

    setColor(isLiked ? '#f13636' : '#9e9e9e');
    setPulse(isLiked ? true : false);
  }, [post, user]);

  const { data, isError, isFetching } = useQuery<GetPostByIdResponse>({
    queryKey: ['getPostById', postId],
    queryFn: () => postsService.getById(postId),
  });

  if (isError) {
    return navigate('/', { replace: true });
  }

  useEffect(() => {
    if (data) {
      setPost(data);
      setLikesCount(data.post.likes ? data.post.likes.length : 0);
    }
  }, [data]);

  if (!post) {
    return (
      <>
        <Sidebar signOut={signOut} userName={userName} />
        <div className="sm:ml-64 h-full">
          <PostDetailSkeleton />
        </div>
      </>
    );
  }

  const handleLike = async () => {
    if (liking) return;

    setLiking(true);

    try {
      setPulse(!pulse);

      setColor((prevColor) =>
        prevColor === '#9e9e9e' ? '#f13636' : '#9e9e9e'
      );

      const { message } = await postsService.like({
        postId: post.post.id,
      });

      message.includes('Post Liked')
        ? setLikesCount(likesCount + 1)
        : setLikesCount(likesCount - 1);
    } catch {
      toast.error('Oops, an error occurred');
    } finally {
      setLiking(false);
    }
  };

  return (
    <>
      <Sidebar signOut={signOut} userName={userName} />
      <section className="py-10 h-full sm:py-16 lg:py-16 lg:px-56 sm:ml-64 overflow-auto">
        <div className="px-4 mx-auto sm:px-6 lg:px-8">
          <div className="flex flex-col mt-8 md:mt-10 gap-y-6 md:grid-cols-2 gap-x-10 relative">
            <div className="flex flex-col">
              <img
                className="object-cover lg:max-h-80 lg:w-full select-none"
                src={`${env.apiUrl}/uploads/posts/${post?.post.image}`}
                alt={post.post.title}
              />

              <div className="mt-2 w-full flex justify-between items-start">
                <div>
                  <span className="block text-[12px] font-semibold text-gray-500 uppercase">
                    {formatDate(post.post.createdAt)}
                  </span>
                  <span className="text-gray-600 text-[12px] font-normal">
                    <b>{post.post.author.name}</b>, {post.post.author.job.name}.
                  </span>
                </div>
                {isFetching ? (
                  <div className="h-3 bg-gray-200 rounded-sm dark:bg-gray-300 w-[72px] mt-1"></div>
                ) : (
                  <>
                    <div className="flex gap-2">
                      <span className="flex items-center gap-1 text-[12px] font-light text-[#4b5563]">
                        <BarChartIcon height={12} width={12} color="#4b5563" />
                        <p>{post.post.views}</p>
                      </span>
                      <span className="flex items-center gap-1 text-[12px] font-light text-[#4b5563]">
                        <HeartFilledIcon
                          height={16}
                          width={16}
                          color={color}
                          cursor={'pointer'}
                          className={`${
                            pulse ? 'animate-pulselike' : 'animate-pulsedislike'
                          }`}
                          onClick={liking ? undefined : handleLike}
                        />
                        <p>{likesCount}</p>
                      </span>
                    </div>
                  </>
                )}
              </div>

              <div className="md:text-center mt-8">
                <h2 className="w-full text-2xl text-left font-bold leading-tight text-black">
                  {post.post.title}
                </h2>
              </div>

              <div className="absolute top-4 left-4">
                <span className="px-4 py-2 text-xs font-semibold tracking-widest text-gray-900 uppercase bg-white rounded-full">
                  {post.post.category.name}
                </span>
              </div>
            </div>

            <div>
              <p className="text-[16px] font-serif">{post.post.content}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
