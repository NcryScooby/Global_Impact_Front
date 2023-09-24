import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { IErrorResponse } from '@interfaces/errors/IErrorResponse';
import { CreateSavedPostData } from '@services/postsService/savedPost';
import { postsService } from '@services/postsService';
import type { IPost } from '@interfaces/posts/IPost';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface ISavedPost {
  post: IPost;
}

interface IMySavedPostData {
  savedPosts: ISavedPost[];
}

export const useSavePost = (post: IPost) => {
  const queryClient = useQueryClient();
  const [savedPostIcon, setSavedPostIcon] = useState<string>('BsBookmark');
  const [savedPostMessage, setSavedPostMessage] = useState<string>('Save');

  const { data, isFetching: isFetchingMySavedPosts } = useQuery({
    queryKey: ['mySavedPosts'],
    queryFn: postsService.mySavedPost,
    staleTime: Infinity,
  });

  const { mutateAsync } = useMutation({
    mutationFn: (postData: CreateSavedPostData) =>
      postsService.savedPost({ postId: postData.postId }),

    onMutate: () => {
      const currentData = queryClient.getQueryData<IMySavedPostData>(['mySavedPosts']);

      queryClient.setQueryData(['mySavedPosts'], (prevData: IMySavedPostData | undefined) => {
        if (!prevData) {
          return {
            savedPosts: isPostSaved() ? [] : [{ post }],
          };
        }

        const newData = { ...prevData };
        if (isPostSaved()) {
          newData.savedPosts = newData.savedPosts.filter(
            (savedPost: ISavedPost) => savedPost.post.id !== post.id
          );
        } else {
          newData.savedPosts.push({ post });
        }
        return newData;
      });

      updateSavedPostStatus();

      return { currentData };
    },

    onError: (error, _, context) => {
      queryClient.setQueryData(['mySavedPosts'], context?.currentData);
      const errorMessage = (error as IErrorResponse)?.response?.data?.message;
      toast.error(errorMessage);
      updateSavedPostStatus();
    },
  });

  const isPostSaved = () => {
    return data?.savedPosts?.some((saved) => saved.post.id === post.id) ?? false;
  };

  const updateSavedPostStatus = () => {
    const postSaved = isPostSaved();
    setSavedPostIcon(postSaved ? 'BsBookmarkFill' : 'BsBookmark');
    setSavedPostMessage(postSaved ? 'Saved' : 'Save');
  };

  const savePost = async (postData: CreateSavedPostData) => {
    const { message } = await mutateAsync(postData);
    message === 'Post Saved' ? toast.success(message) : toast.error(message);
  };

  useEffect(() => {
    updateSavedPostStatus();
  }, [data]);

  return {
    savedPostIcon,
    savePost,
    isPostSaved,
    savedPostMessage,
    isFetchingMySavedPosts,
  };
};
