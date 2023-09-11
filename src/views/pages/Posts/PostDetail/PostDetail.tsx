import { PostDetailSkeleton } from '@components/skeletons/posts/PostDetailSkeleton';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { GetPostByIdResponse } from '@services/postsService/getById';
import { usePostDetailController } from './userPostDetailController';
import { DeleteAlertDialog } from '@components/ui/DeleteAlertDialog';
import { TextAlertDialog } from '@components/ui/TextAlertDialog';
import { RelatedPosts } from '@components/posts/RelatedPosts';
import { CommentLabel } from '@components/posts/CommentLabel';
import { CommentList } from '@components/posts/CommentList';
import { useNavigate, useParams } from 'react-router-dom';
import { DetailCard } from '@components/posts/DetailCard';
import { Breadcrumbs } from '@components/ui/Breadcrumbs';
import { MeResponse } from '@services/usersService/me';
import { postsService } from '@services/postsService';
import { commentsService } from '@services/comments';
import { useAuth } from '@hooks/useAuth';
import { useLike } from '@hooks/useLike';
import { toast } from 'react-hot-toast';
import { useState } from 'react';

export const PostDetail = () => {
  const { postId } = useParams() as { postId: string };

  const { userAvatar } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [openDeleteCommentDialog, setOpenDeleteCommentDialog] = useState<boolean>(false);
  const [openCreateCommentDialog, setOpenCreateCommentDialog] = useState<boolean>(false);
  const [openDeletePostDialog, setOpenDeletePostDialog] = useState<boolean>(false);
  const [commentId, setCommentId] = useState<string>('');

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

  const userData = queryClient.getQueryData<MeResponse>(['loggedUser']);

  const user = userData?.user;

  const {
    data: postData,
    isError,
    isFetching,
  } = useQuery<GetPostByIdResponse>({
    queryKey: ['getPostById', postId],
    queryFn: () => postsService.getById(postId),
  });

  if (isError || !user) {
    navigate('/', { replace: true });
    return null;
  }

  const post = postData?.post;
  const relatedPosts = postData?.relatedPosts || [];

  const { likesCount, pulse, clicked, like, color, handleLike } = useLike({
    postId: postId,
    user: user,
    initialLikesCount: post?.likes.length || 0,
    postLikes: post?.likes || [],
  });

  const deletePostMutation = useMutation(postsService.deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'getPosts',
      });
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

  async function handleDelete<T>(featureId: T, mutation: MutateFunction<T>) {
    try {
      await mutation.mutateAsync(featureId);
    } catch {
      toast.error('Oops, an error occurred');
    }
  }

  if (!post) {
    return (
      <>
        <div className="sm:ml-64 h-full">
          <PostDetailSkeleton />
        </div>
      </>
    );
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
          className={`${relatedPosts.length > 0 ? 'pt-16' : 'py-10'} h-full lg:px-56 sm:ml-64`}
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
          <span className="border-b-[1px] border-gray-300 dark:border-black-500 block w-[675px] mx-auto mt-28" />
          <CommentLabel
            postData={postData}
            setOpenCreateCommentDialog={setOpenCreateCommentDialog}
          />
          <CommentList
            comments={post.comments}
            userId={user.id}
            userRole={user.role.name}
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
