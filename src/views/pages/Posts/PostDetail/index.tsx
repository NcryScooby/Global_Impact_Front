import {
  BarChartIcon,
  HeartFilledIcon,
  ChevronRightIcon,
  PlusIcon,
} from '@radix-ui/react-icons';
import { PostDetailSkeleton } from '../../../components/skeletons/posts/PostDetailSkeleton';
import { GetPostByIdResponse } from '../../../../app/services/postsService/getById';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { formatDate } from '../../../../app/utils/functions/formatDate';
import { MeResponse } from '../../../../app/services/usersService/me';
import { postsService } from '../../../../app/services/postsService';
import { usePostDetailController } from './userPostDetailController';
import { commentsService } from '../../../../app/services/comments';
import { CommentList } from '../../../components/posts/CommentList';
import { AlertDialog } from '../../../components/ui/AlertDialog';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { TextDialog } from '../../../components/ui/TextDialog';
import { POST_LIKE_COLORS } from '../../../../app/constants';
import { Sidebar } from '../../../components/ui/Sidebar';
import { useAuth } from '../../../../app/hooks/UseAuth';
import { Avatar, Breadcrumbs } from '@mui/material';
import { env } from '../../../../app/config/env';
import Card from '../../../components/ui/Card';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

export const PostDetail = () => {
  const { postId } = useParams() as { postId: string };
  const { signOut, userAvatar } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [post, setPost] = useState<GetPostByIdResponse>();
  const [likesCount, setLikesCount] = useState<number>(0);
  const [pulse, setPulse] = useState<boolean>(false);
  const [clicked, setClicked] = useState(false);
  const [like, setLike] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [openCreateCommentDialog, setOpenCreateCommentDialog] =
    useState<boolean>(false);
  const [commentId, setCommentId] = useState<string>('');
  const [color, setColor] = useState<string>('');

  type DeleteCommentFunction = (commentId: string) => Promise<void>;
  type CreateCommentFunction = (
    e?: React.BaseSyntheticEvent<object>
  ) => Promise<void>;

  const {
    errors,
    handleSubmit,
    register,
    reset,
    isLoading: isLoadingCreateComment,
  } = usePostDetailController(postId, setOpenCreateCommentDialog);

  const { data: user } = useQuery<MeResponse>({
    queryKey: ['loggedUser'],
    staleTime: Infinity,
  });

  const { data, isError, isFetching } = useQuery<GetPostByIdResponse>({
    queryKey: ['getPostById', postId],
    queryFn: () => postsService.getById(postId),
  });

  const deleteCommentMutation = useMutation(commentsService.deleteComment, {
    onSuccess: async () => {
      await queryClient.refetchQueries(['getPostById', postId]);
      setOpenDeleteDialog(false);
      toast.success('Comment deleted successfully');
    },
  });

  const { isLoading: isLoadingDeleteComment } = deleteCommentMutation;

  if (isError) {
    navigate('/', { replace: true });
    return null;
  }

  useEffect(() => {
    if (data) {
      setPost(data);
      setLikesCount(data.post.likes?.length || 0);
    }
  }, [data]);

  useEffect(() => {
    const isPostLikedByUser = () => {
      return post?.post.likes?.some((like) => like.authorId === user?.user.id);
    };

    const isLiked = isPostLikedByUser();

    setColor(isLiked ? POST_LIKE_COLORS.LIKED : POST_LIKE_COLORS.UNLIKED);
    setPulse(isLiked ?? false);
  }, [post, user]);

  if (!post) {
    return (
      <>
        <Sidebar signOut={signOut} userAvatar={userAvatar} />
        <div className="sm:ml-64 h-full">
          <PostDetailSkeleton />
        </div>
      </>
    );
  }

  const togglePulse = () => setPulse((prevPulse) => !prevPulse);

  const updateColor = () => {
    setColor((prevColor) =>
      prevColor === POST_LIKE_COLORS.UNLIKED
        ? POST_LIKE_COLORS.LIKED
        : POST_LIKE_COLORS.UNLIKED
    );
  };

  const updateLikesBasedOnMessage = (message: string) => {
    const delta = message.includes('Post Liked') ? 1 : -1;
    setLikesCount(likesCount + delta);
  };

  const handleLike = async () => {
    if (like) return;

    setClicked(true);
    setLike(true);

    try {
      togglePulse();
      updateColor();

      const { message } = await postsService.like({
        postId: post.post.id,
      });

      updateLikesBasedOnMessage(message);
    } catch {
      toast.error('Oops, an error occurred');
    } finally {
      setLike(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteCommentMutation.mutateAsync(commentId);
    } catch {
      toast.error('Oops, an error occurred');
    }
  };

  const renderAlertDialog = (
    open: boolean,
    onConfirm: DeleteCommentFunction,
    commentId: string
  ) =>
    open ? (
      <AlertDialog
        title="Are you sure you want to delete this comment?"
        content="Do you really want to remove this comment? Once deleted, it cannot be recovered."
        isLoading={isLoadingDeleteComment}
        openDialog={open}
        setOpenDialog={setOpenDeleteDialog}
        onConfirm={() => onConfirm(commentId)}
      />
    ) : null;

  const renderTextDialog = (open: boolean, onConfirm: CreateCommentFunction) =>
    open ? (
      <TextDialog
        userAvatar={userAvatar}
        userName={user?.user.name || ''}
        jobName={user?.user.job.name || ''}
        isLoading={isLoadingCreateComment}
        onConfirm={onConfirm}
        openDialog={open}
        setOpenDialog={setOpenCreateCommentDialog}
        error={errors.content?.message || ''}
        fieldName="content"
        register={register}
        reset={reset}
      />
    ) : null;

  return (
    <>
      {renderAlertDialog(openDeleteDialog, handleDeleteComment, commentId)}
      {renderTextDialog(openCreateCommentDialog, handleSubmit)}
      <Sidebar signOut={signOut} userAvatar={userAvatar} />
      <div className="overflow-x-hidden">
        <section
          className={`${
            post.relatedPosts.length > 0 ? 'pt-16' : 'py-10'
          } h-full lg:px-56 sm:ml-64`}
        >
          <div className="px-4 mx-auto sm:px-6 lg:px-8">
            <Breadcrumbs
              aria-label="breadcrumb"
              separator={<ChevronRightIcon color="#3f3f3f" width={11} />}
              sx={{
                fontSize: '12px',
                color: '#3f3f3f',
                '& li': { m: 0.25 },
              }}
            >
              <Link to="/">Home</Link>
              <Link to="/posts">Posts</Link>
              <Link to={`/posts/categories/${post.post.category.id}`}>
                {post.post.category.name}
              </Link>
              <Link to={`/posts/${post.post.id}`}>{post.post.title}</Link>
            </Breadcrumbs>
            <div className="flex flex-col mt-8 md:mt-10 gap-y-6 md:grid-cols-2 gap-x-10 relative">
              <div className="flex flex-col">
                <img
                  className="object-cover object-top lg:max-h-80 lg:w-full select-none"
                  src={`${env.apiUrl}/uploads/posts/${post?.post.image}`}
                  alt={post.post.title}
                />
                <div className="mt-2 w-full flex justify-between items-start">
                  <div className="flex items-center gap-2 mt-4">
                    <Link to={`/posts/authors/${post.post.author.id}`}>
                      <Avatar
                        alt="User avatar"
                        src={
                          post.post.author.avatar
                            ? `${env.apiUrl}/uploads/users/${post.post.author.avatar}`
                            : ''
                        }
                        sx={{
                          width: 48,
                          height: 48,
                        }}
                      />
                    </Link>
                    <div>
                      <span className="block text-[12px] text-gray-600 uppercase">
                        {formatDate(post.post.createdAt)}
                      </span>
                      <span className="text-gray-600 text-[12px] font-normal">
                        <b>{post.post.author.name}</b>,{' '}
                        {post.post.author.job.name}.
                      </span>
                    </div>
                  </div>
                  {isFetching ? (
                    <div className="h-3 rounded-sm bg-gray-300 w-[72px] mt-1"></div>
                  ) : (
                    <>
                      <div className="flex gap-2 select-none">
                        <span className="flex items-center gap-1 text-[12px] font-light text-[#4b5563]">
                          <BarChartIcon
                            height={12}
                            width={12}
                            color="#4b5563"
                          />
                          {post.post.views > 1000
                            ? `${(post.post.views / 1000).toFixed(1)}k`
                            : post.post.views}
                        </span>
                        <span className="flex items-center gap-1 text-[12px] font-light text-[#4b5563]">
                          <HeartFilledIcon
                            height={16}
                            width={16}
                            color={color}
                            cursor={'pointer'}
                            className={
                              clicked
                                ? pulse
                                  ? 'animate-pulselike'
                                  : 'animate-pulsedislike'
                                : ''
                            }
                            onClick={like ? undefined : handleLike}
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
                  <Link to={`/posts/categories/${post.post.category.id}`}>
                    <span className="px-4 py-2 text-xs font-semibold tracking-widest text-gray-900 uppercase bg-white rounded-full">
                      {post.post.category.name}
                    </span>
                  </Link>
                </div>
              </div>
              <div>
                <p className="text-[16px] font-serif">{post.post.content}</p>
              </div>
            </div>
          </div>
          <span
            className="border-b-[1px] border-gray-300 block w-[675px] mx-auto
           mt-28"
          />
          <div className="flex justify-between mt-28 px-4 lg:px-8">
            {post.post.comments.length > 0 ? (
              <h2 className="font-semibold text-lg font-inter">
                Comments ({post.post.comments.length})
              </h2>
            ) : (
              <div>
                <h2 className="font-semibold text-lg font-inter">
                  No comments yet
                </h2>
                <span className="text-[12px] text-gray-500">
                  Be the first to comment
                </span>
              </div>
            )}
            <div
              className="cursor-pointer hover:bg-gray-800 bg-primary text-white w-6 h-6 flex items-center justify-center rounded-full"
              onClick={() => {
                setOpenCreateCommentDialog(true);
              }}
            >
              <PlusIcon />
            </div>
          </div>
          {post.post.comments.length > 0 ? (
            <div className="px-4 lg:px-8">
              <CommentList
                comments={post.post.comments}
                userId={user ? user?.user.id : ''}
                onDelete={(commentId) => {
                  setCommentId(commentId);
                  setOpenDeleteDialog(true);
                }}
              />
            </div>
          ) : null}
        </section>
        {post.relatedPosts && post.relatedPosts.length > 0 ? (
          <div className="sm:ml-64">
            {post.relatedPosts.length > 0 ? (
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
              className={`px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-${post.relatedPosts.length} my-8 gap-8`}
            >
              {post.relatedPosts.map((post, index) => (
                <Card post={post} key={index} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};
