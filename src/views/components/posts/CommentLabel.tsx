import { GetPostByIdResponse } from '../../../app/services/postsService/getById';
import { PlusIcon } from '@radix-ui/react-icons';

interface CommentLabelProps {
  postData: GetPostByIdResponse;
  setOpenCreateCommentDialog: (value: React.SetStateAction<boolean>) => void;
}

export const CommentLabel = ({
  postData,
  setOpenCreateCommentDialog,
}: CommentLabelProps) => {
  const { post } = postData;

  return (
    <div className="flex justify-between mt-28 px-4 lg:px-8">
      {post.comments.length > 0 ? (
        <h2 className="font-semibold text-lg font-inter">
          Comments ({post.comments.length})
        </h2>
      ) : (
        <div>
          <h2 className="font-semibold text-lg font-inter">No comments yet</h2>
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
  );
};
