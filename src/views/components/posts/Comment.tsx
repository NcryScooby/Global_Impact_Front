import { TrashIcon } from '@radix-ui/react-icons';
import { env } from '../../../app/config/env';

interface CommentProps {
  comment: {
    id: string;
    author: {
      id: string;
      name: string;
      avatar: string;
      job: {
        name: string;
      };
    };
    content: string;
  };
  userId: string;
  onDelete: (id: string) => void;
}

export const Comment = ({ comment, userId, onDelete }: CommentProps) => {
  return (
    <>
      <span className="absolute right-4 top-4">
        {userId === comment.author.id ? (
          <TrashIcon
            height={22}
            width={22}
            color="#a3a3a3"
            className="bg-white rounded-full p-1 cursor-pointer hover:bg-gray-100"
            onClick={() => onDelete(comment.id)}
          />
        ) : null}
      </span>
      <div className="max-w-4xl px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between space-x-12 w-full">
          <div className="relative flex-shrink-0">
            <img
              className="relative object-cover w-12 h-12 lg:w-20 lg:h-20 rounded-full select-none shadow-2xl"
              src={`${env.apiUrl}/uploads/users/${comment.author.avatar}`}
              alt={comment.author.name}
            />
          </div>
          <div className="mt-0 lg:mt-0 w-full">
            <blockquote>
              <p className="text-[12px] lg:text-sm text-black">
                {comment.content}
              </p>
            </blockquote>
            <p className="text-[12px] lg:text-sm font-semibold text-black mt-7">
              {comment.author.name}
            </p>
            <p className="mt-1 text-[12px] lg:text-sm text-gray-600">
              {comment.author.job.name}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
