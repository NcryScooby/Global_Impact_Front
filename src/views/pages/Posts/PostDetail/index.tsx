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
import { env } from '../../../../app/config/env';
import { useEffect, useState } from 'react';
import { Breadcrumbs } from '@mui/material';
import { toast } from 'react-hot-toast';

export const PostDetail = () => {
  const { postId } = useParams() as { postId: string };
  const { signOut, userAvatar } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [post, setPost] = useState<GetPostByIdResponse>();
  const [likesCount, setLikesCount] = useState<number>(0);
  const [pulse, setPulse] = useState<boolean>(false);
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
    return navigate('/', { replace: true });
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
      <section className="py-10 h-full sm:py-16 lg:py-16 lg:px-56 sm:ml-64 overflow-scroll">
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
            <Link to={`/posts/${post.post.id}`}>{post.post.title}</Link>
          </Breadcrumbs>
          <div className="flex flex-col mt-8 md:mt-10 gap-y-6 md:grid-cols-2 gap-x-10 relative">
            <div className="flex flex-col">
              <img
                className="object-cover lg:max-h-80 lg:w-full select-none"
                src={`${env.apiUrl}/uploads/posts/${post?.post.image}`}
                alt={post.post.title}
              />
              <div className="mt-2 w-full flex justify-between items-start">
                <div>
                  <span className="block text-[12px] text-gray-600 uppercase">
                    {formatDate(post.post.createdAt)}
                  </span>
                  <span className="text-gray-600 text-[12px] font-normal">
                    <b>{post.post.author.name}</b>, {post.post.author.job.name}.
                  </span>
                </div>
                {isFetching ? (
                  <div className="h-3 rounded-sm bg-gray-300 w-[72px] mt-1"></div>
                ) : (
                  <>
                    <div className="flex gap-2 select-none">
                      <span className="flex items-center gap-1 text-[12px] font-light text-[#4b5563]">
                        <BarChartIcon height={12} width={12} color="#4b5563" />
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
                          className={`${
                            pulse ? 'animate-pulselike' : 'animate-pulsedislike'
                          }`}
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
        <div className="relative">
          <h2 className="absolute top-20 left-8 font-semibold text-xl font-inter">
            {post.post.comments.length > 0 ? 'Comments' : ''}
          </h2>
          {post.post.comments.length > 0 ? (
            <div
              className="absolute right-8 top-[82px] cursor-pointer hover:bg-gray-800 bg-primary text-white w-6 h-6 flex items-center justify-center rounded-full"
              onClick={() => {
                setOpenCreateCommentDialog(true);
              }}
            >
              <PlusIcon />
            </div>
          ) : null}
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
    </>
  );
};
