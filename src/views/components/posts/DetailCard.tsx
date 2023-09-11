import { GetPostByIdResponse } from '../../../app/services/postsService/getById';
import { BarChartIcon, Share1Icon, TrashIcon } from '@radix-ui/react-icons';
import { formatViews } from '../../../app/utils/helpers/formatViews';
import { MeResponse } from '../../../app/services/usersService/me';
import { formatDate } from '../../../app/utils/helpers/formatDate';
import { useTheme } from '../../../app/hooks/useTheme';
import { USER_ROLES } from '../../../app/constants';
import { SetStateAction, useState } from 'react';
import { LikeComponent } from './LikeComponent';
import { ShareDialog } from '../ui/ShareDialog';
import { env } from '../../../app/config/env';
import { Link } from 'react-router-dom';
import { Avatar } from '@mui/material';

interface DetailCardProps {
  postData: GetPostByIdResponse;
  isFetching: boolean;
  likesCount: number;
  color: string;
  pulse: boolean;
  clicked: boolean;
  like: boolean;
  handleLike: () => void;
  userData: MeResponse;
  setOpenDeletePostDialog: (value: SetStateAction<boolean>) => void;
}

export const DetailCard = ({
  postData,
  isFetching,
  likesCount,
  color,
  pulse,
  clicked,
  like,
  handleLike,
  userData,
  setOpenDeletePostDialog,
}: DetailCardProps) => {
  const { post } = postData;
  const { user } = userData;

  const { theme } = useTheme();

  const [openShareDialog, setOpenShareDialog] = useState<boolean>(false);

  const handleOpenShareDialog = () => setOpenShareDialog(true);
  const handleCloseShareDialog = () => setOpenShareDialog(false);

  return (
    <>
      {openShareDialog ? (
        <ShareDialog
          openShareDialog={openShareDialog}
          handleCloseShareDialog={handleCloseShareDialog}
        />
      ) : null}
      <div className="flex flex-col mt-8 md:mt-10 gap-y-6 md:grid-cols-2 gap-x-10 relative">
        <div className="flex flex-col">
          <img
            loading="lazy"
            className="object-cover object-top lg:max-h-80 lg:w-full select-none"
            src={`${env.apiUrl}/uploads/posts/${post.image}`}
            alt={post.title}
          />
          <div className="mt-2 w-full flex justify-between items-start">
            <div className="flex items-center gap-2 mt-4">
              <Link to={`/posts/authors/${post.author.id}`}>
                <Avatar
                  alt="User avatar"
                  src={`${env.apiUrl}/uploads/users/${post.author.avatar}`}
                  sx={{
                    width: 48,
                    height: 48,
                  }}
                />
              </Link>
              <div>
                <span className="block text-[12px] text-gray-600 dark:text-gray-400 uppercase">
                  {formatDate(post.createdAt)}
                </span>
                <span className="text-gray-600 dark:text-gray-400 text-[12px] font-normal">
                  <b>{post.author.name}</b>, {post.author.job.name}.
                </span>
              </div>
            </div>
            {isFetching ? (
              <div className="h-3 rounded-sm bg-gray-300 dark:bg-black-500 w-[72px] mt-1"></div>
            ) : (
              <>
                <div className="flex flex-col items-end gap-2 select-none lg:flex-row lg:items-center">
                  <div className="flex gap-2">
                    <span className="flex items-center gap-1 text-[12px] font-light text-[#4b5563] dark:text-gray-400">
                      <BarChartIcon
                        height={12}
                        width={12}
                        color={theme === 'light' ? '#4b5563' : '#bdbdbd'}
                      />
                      {formatViews(post.views)}
                    </span>
                    <span className="flex items-center gap-1 text-[12px] font-light text-[#4b5563] dark:text-gray-400">
                      <LikeComponent
                        likesCount={likesCount}
                        color={color}
                        pulse={pulse}
                        clicked={clicked}
                        like={like}
                        handleLike={handleLike}
                      />
                    </span>
                  </div>
                  <span
                    className="flex items-center justify-center bg-gray-200 dark:bg-black-500 w-6 p-1.5 rounded-full hover:bg-gray-300 dark:hover:bg-black-400 cursor-pointer"
                    onClick={handleOpenShareDialog}
                  >
                    <Share1Icon
                      height={12}
                      width={12}
                      color={theme === 'light' ? '#9e9e9e' : '#bdbdbd'}
                    />
                  </span>
                </div>
              </>
            )}
          </div>
          <div className="md:text-center mt-8">
            <h2 className="w-full text-2xl text-left font-bold leading-tight text-black dark:text-white">
              {post.title}
            </h2>
          </div>
          <div className="absolute top-4 left-4">
            <Link to={`/posts/categories/${post.category.id}`}>
              <span className="px-4 py-2 text-xs font-semibold tracking-widest text-gray-900 uppercase bg-white dark:bg-black-500 dark:text-white rounded-full">
                {post.category.name}
              </span>
            </Link>
          </div>
          {post.author.id === user.id || user.role.name === USER_ROLES.ADMIN ? (
            <div className="absolute top-4 right-4">
              <TrashIcon
                height={22}
                width={22}
                color={theme === 'light' ? '#111111' : '#9e9e9e'}
                className="bg-white dark:bg-black-500 rounded-full p-1 cursor-pointer hover:bg-gray-200 dark:hover:bg-black-400"
                onClick={() => {
                  setOpenDeletePostDialog(true);
                }}
              />
            </div>
          ) : null}
        </div>
        <div>
          <p className="text-[16px] font-serif dark:text-gray-400">{post.content}</p>
        </div>
      </div>
    </>
  );
};
