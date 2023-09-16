import { GetPostByIdResponse } from '@services/postsService/getById';
import { PlusIcon } from '@radix-ui/react-icons';
import { SetStateAction } from 'react';

interface CommentLabelProps {
  post: GetPostByIdResponse['post'];
  setOpenCreateCommentDialog: (value: SetStateAction<boolean>) => void;
}

export const CommentLabel = ({ post, setOpenCreateCommentDialog }: CommentLabelProps) => {
  return (
    <div className="flex justify-between mt-28 px-4 lg:px-8">
      {post.comments.length > 0 ? (
        <h2 className="font-semibold text-lg font-inter dark:text-gray-400">
          Comments ({post.comments.length})
        </h2>
      ) : (
        <div>
          <h2 className="font-semibold text-lg font-inter dark:text-gray-400">No comments yet</h2>
          <span className="text-[12px] text-gray-500 dark:text-gray-400">
            Be the first to comment
          </span>
        </div>
      )}
      <div
        className="cursor-pointer hover:bg-gray-800 bg-primary dark:bg-black-500 dark:hover:bg-black-400 text-white w-6 h-6 flex items-center justify-center rounded-full dark:text-[#bdbdbd]"
        onClick={() => {
          setOpenCreateCommentDialog(true);
        }}
      >
        <PlusIcon />
      </div>
    </div>
  );
};
