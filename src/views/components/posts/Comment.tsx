import { formatDate } from '../../../app/utils/helpers/formatDate';
import { useTheme } from '../../../app/hooks/useTheme';
import { USER_ROLES } from '../../../app/constants';
import { TrashIcon } from '@radix-ui/react-icons';
import { Avatar, Divider } from '@mui/material';
import { env } from '../../../app/config/env';
import { Link } from 'react-router-dom';

interface CommentProps {
  comment: {
    id: string;
    author: {
      id: string;
      name: string;
      avatar: string;
      job: {
        id: string;
        name: string;
      };
    };
    content: string;
    createdAt: string;
  };
  userId: string;
  userRole: string;
  onDelete: (id: string) => void;
}

export const Comment = ({ comment, userId, userRole, onDelete }: CommentProps) => {
  const { theme } = useTheme();
  return (
    <>
      <span className="absolute right-4 top-4">
        {userId === comment.author.id || userRole === USER_ROLES.ADMIN ? (
          <TrashIcon
            height={22}
            width={22}
            color={theme === 'light' ? '#9e9e9e' : '#bdbdbd'}
            className="bg-white rounded-full p-1 cursor-pointer hover:bg-gray-100 dark:bg-black-600 dark:hover:bg-black-400"
            onClick={() => onDelete(comment.id)}
          />
        ) : null}
      </span>
      <div className="max-w-4xl px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between space-x-8 w-full">
          <div className="relative flex-shrink-0">
            <Link to={`/posts/authors/${comment.author.id}`}>
              <Avatar
                className="select-none"
                alt={comment.author.name}
                src={`${env.apiUrl}/uploads/users/${comment.author.avatar}`}
                sx={{
                  width: 80,
                  height: 80,
                }}
              />
            </Link>
          </div>
          <Divider
            orientation="vertical"
            flexItem
            sx={theme === 'light' ? null : { backgroundColor: '#222222' }}
          />
          <div className="mt-0 lg:mt-0 w-full flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <div>
                <p className="text-[14px] font-semibold text-black dark:text-white">
                  {comment.author.name}
                  <span className="text-[12px] font-normal text-gray-600 dark:text-gray-300">
                    , {comment.author.job.name}.
                  </span>
                </p>
              </div>
              <p className="text-[10px] text-gray-500">{formatDate(comment.createdAt)}</p>
            </div>
            <blockquote>
              <p className="text-[12px] lg:text-sm text-black dark:text-gray-300">
                {comment.content}
              </p>
            </blockquote>
          </div>
        </div>
      </div>
    </>
  );
};
