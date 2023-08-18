import { PostDetailSkeleton } from '../../../components/skeletons/posts/PostDetailSkeleton';
import { GetPostByIdResponse } from '../../../../app/services/postsService/getById';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { DeleteAlertDialog } from '../../../components/ui/DeleteAlertDialog';
import { TextAlertDialog } from '../../../components/ui/TextAlertDialog';
import { MeResponse } from '../../../../app/services/usersService/me';
import { RelatedPosts } from '../../../components/posts/RelatedPosts';
import { CommentLabel } from '../../../components/posts/CommentLabel';
import { postsService } from '../../../../app/services/postsService';
import { usePostDetailController } from './userPostDetailController';
import { commentsService } from '../../../../app/services/comments';
import { CommentList } from '../../../components/posts/CommentList';
import { DetailCard } from '../../../components/posts/DetailCard';
import { Breadcrumbs } from '../../../components/ui/Breadcrumbs';
import { POST_LIKE_COLORS } from '../../../../app/constants';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../../../app/hooks/UseAuth';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

export const PostDetail = () => {
  const { postId } = useParams() as { postId: string };
  const { userAvatar } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [likesCount, setLikesCount] = useState<number>(0);
  const [pulse, setPulse] = useState<boolean>(false);
  const [clicked, setClicked] = useState(false);
  const [like, setLike] = useState<boolean>(false);
  const [openDeleteCommentDialog, setOpenDeleteCommentDialog] =
    useState<boolean>(false);
  const [openCreateCommentDialog, setOpenCreateCommentDialog] =
    useState<boolean>(false);
  const [openDeletePostDialog, setOpenDeletePostDialog] =
    useState<boolean>(false);
  const [commentId, setCommentId] = useState<string>('');
  const [color, setColor] = useState<string>('');

  type MutateFunction<T> = {
    mutateAsync: (data: T) => Promise<void>;
  };

  const {
    errors,
    handleSubmit,
    register,
    reset,
    isLoading: isLoadingCreateComment,
  } = usePostDetailController(postId, setOpenCreateCommentDialog);

  const { data: userData } = useQuery<MeResponse>({
    queryKey: ['loggedUser'],
    staleTime: Infinity,
  });

  if (!userData) {
    return null;
  }

  const user = userData.user;

  const {
    data: postData,
    isError,
    isFetching,
  } = useQuery<GetPostByIdResponse>({
    queryKey: ['getPostById', postId],
    queryFn: () => postsService.getById(postId),
  });

  const post = postData?.post;
  const relatedPosts = postData?.relatedPosts || [];

  if (isError) {
    navigate('/', { replace: true });
    return null;
  }

  const deletePostMutation = useMutation(postsService.deletePost, {
    onSuccess: () => {
      setOpenDeletePostDialog(false);
      toast.success('Post deleted successfully');
      navigate('/posts', { replace: true });
    },
  });

  const { isLoading: isLoadingDeletePost } = deletePostMutation;

  const deleteCommentMutation = useMutation(commentsService.deleteComment, {
    onSuccess: async () => {
      await queryClient.refetchQueries(['getPostById', postId]);
      setOpenDeleteCommentDialog(false);
      toast.success('Comment deleted successfully');
    },
  });

  const { isLoading: isLoadingDeleteComment } = deleteCommentMutation;

  useEffect(() => {
    setLikesCount(post?.likes.length || 0);
  }, [post]);

  useEffect(() => {
    const isPostLikedByUser = () => {
      return post?.likes?.some((like) => like.authorId === user.id);
    };

    const isLiked = isPostLikedByUser();

    setColor(isLiked ? POST_LIKE_COLORS.LIKED : POST_LIKE_COLORS.UNLIKED);
    setPulse(isLiked ?? false);
  }, [post, user]);

  if (!post) {
    return (
      <>
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
        postId: post.id,
      });

      updateLikesBasedOnMessage(message);
    } catch {
      toast.error('Oops, an error occurred');
    } finally {
      setLike(false);
    }
  };

  async function handleDelete<T>(featureId: T, mutation: MutateFunction<T>) {
    try {
      await mutation.mutateAsync(featureId);
    } catch {
      toast.error('Oops, an error occurred');
    }
  }

  return (
    <>
      <DeleteAlertDialog
        title="Are you sure you want to delete this post?"
        content="Do you really want to remove this post? Once deleted, it cannot be recovered."
        isLoading={isLoadingDeletePost}
        open={openDeletePostDialog}
        onConfirm={() => handleDelete<string>(postId, deletePostMutation)}
        featureId={postId}
        setOpenDialog={setOpenDeletePostDialog}
      />
      <DeleteAlertDialog
        title="Are you sure you want to delete this comment?"
        content="Do you really want to remove this comment? Once deleted, it cannot be recovered."
        isLoading={isLoadingDeleteComment}
        open={openDeleteCommentDialog}
        onConfirm={() => handleDelete<string>(commentId, deleteCommentMutation)}
        featureId={commentId}
        setOpenDialog={setOpenDeleteCommentDialog}
      />
      <TextAlertDialog
        openDialog={openCreateCommentDialog}
        setOpenDialog={setOpenCreateCommentDialog}
        open={openCreateCommentDialog}
        onConfirm={handleSubmit}
        userAvatar={userAvatar}
        userName={user.name}
        jobName={user.job.name}
        isLoading={isLoadingCreateComment}
        error={errors.content?.message || ''}
        fieldName="content"
        register={register}
        reset={reset}
      />
      <div className="overflow-x-hidden">
        <section
          className={`${
            relatedPosts.length > 0 ? 'pt-16' : 'py-10'
          } h-full lg:px-56 sm:ml-64`}
        >
          <div className="px-4 mx-auto sm:px-6 lg:px-8">
            <Breadcrumbs
              links={[
                { label: 'Home', to: '/' },
                { label: 'Posts', to: '/posts' },
                {
                  label: post.category.name,
                  to: `/posts/categories/${post.category.id}`,
                },
                { label: post.title, to: `/posts/${post.id}` },
              ]}
            />
            <DetailCard
              postData={postData}
              isFetching={isFetching}
              likesCount={likesCount}
              color={color}
              pulse={pulse}
              clicked={clicked}
              like={like}
              handleLike={handleLike}
              userData={userData}
              setOpenDeletePostDialog={setOpenDeletePostDialog}
            />
          </div>
          <span
            className="border-b-[1px] border-gray-300 block w-[675px] mx-auto
           mt-28"
          />
          <CommentLabel
            postData={postData}
            setOpenCreateCommentDialog={setOpenCreateCommentDialog}
          />
          <CommentList
            comments={post.comments}
            userId={user.id}
            onDelete={(commentId) => {
              setCommentId(commentId);
              setOpenDeleteCommentDialog(true);
            }}
          />
        </section>
        <RelatedPosts relatedPosts={relatedPosts} />
      </div>
    </>
  );
};
