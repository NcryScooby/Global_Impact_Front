import { GetUserByUsernameResponse } from '@services/usersService/getUserByUsername';
import { formatJoinedDate } from '@utils/helpers/formatJoinedDate';
import { ProfileSkeleton } from '@components/skeletons/profile';
import { PostShowcase } from '@components/posts/PostShowcase';
import { usersService } from '@services/usersService';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@components/ui/Button';
import { CiLocationOn } from 'react-icons/ci';
import { BsCalendar4 } from 'react-icons/bs';
import { NotFound } from '@pages/NotFound';
import { Avatar } from '@mui/material';
import { env } from '@config/env';

export const Profile = () => {
  const { username } = useParams() as { username: string };
  const { data, isFetching, isError } = useQuery<GetUserByUsernameResponse>({
    queryKey: ['getUserByUsername', username],
    queryFn: () => usersService.getUserByUsername(username),
    keepPreviousData: true,
    staleTime: Infinity,
  });

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="sm:ml-64 overflow-hidden mt-32 lg:mt-0">{children}</div>
  );

  const InfoBlock = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
    <div className="flex items-center justify-center gap-2">
      {icon}
      <p className="text-gray-600 font-light text-sm dark:text-gray-500">{text}</p>
    </div>
  );

  if (isError) {
    return (
      <Wrapper>
        <NotFound status={404} title={'User not found'} model={'user'} />
      </Wrapper>
    );
  }

  if (!data || isFetching) {
    return (
      <Wrapper>
        <ProfileSkeleton />
      </Wrapper>
    );
  }

  const { user, latestPosts } = data;

  return (
    <div className="overflow-x-hidden">
      <div className="sm:ml-64 mt-12">
        <div className="mt-16 lg:mt-0 lg:p-12 flex justify-center items-center flex-col gap-2">
          <h1 className="text-3xl lg:text-4xl font-bold text-black-600 dark:text-white mb-10">
            Member Overview
          </h1>
          <Avatar
            alt="user avatar"
            src={user.avatar ? `${env.apiUrl}/uploads/users/${user.avatar}` : ''}
            sx={{
              border: '0.5px solid #fff',
              width: 96,
              height: 96,
            }}
          />
          <div className="flex flex-col justify-center items-center mt-2">
            <h1 className="text-black-600 text-xl dark:text-white">{user.name}</h1>
            <p className="text-gray-600 dark:text-gray-500 font-light text-sm">{user.email}</p>
            <div className="flex gap-10 mt-8">
              <InfoBlock
                icon={<CiLocationOn className="text-gray-600 dark:text-gray-500" />}
                text={user.countryOfBirth}
              />
              <InfoBlock
                icon={<BsCalendar4 className="text-gray-600 w-3 h-3 dark:text-gray-500" />}
                text={formatJoinedDate(user.joinedAt)}
              />
            </div>
          </div>
          <span className="border-b-[1px] border-gray-300 dark:border-black-500 block w-[675px] mx-auto my-8" />
          <div className="flex gap-8 dark:text-white">
            <div className="flex flex-col items-center">
              <h6>{user.statistics.posts}</h6>
              <p className="text-gray-600 font-light text-sm dark:text-gray-500">Posts</p>
            </div>
            <div className="flex flex-col items-center">
              <h6>{user.statistics.comments}</h6>
              <p className="text-gray-600 font-light text-sm dark:text-gray-500">Comments</p>
            </div>
            <div className="flex flex-col items-center">
              <h6>{user.statistics.likes}</h6>
              <p className="text-gray-600 font-light text-sm dark:text-gray-500">Likes</p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <h5 className="text-gray-600 w-72 font-light text-sm dark:text-gray-500 break-all lg:w-[500px]">
              {user.bio}
            </h5>
          </div>
        </div>
      </div>
      <PostShowcase
        title="Latest Posts"
        description="Check out this user's latest posts"
        posts={latestPosts}
      />
      {user.statistics.posts > 0 && (
        <div className="sm:ml-64 flex justify-center mb-16 mt-20">
          <Link to={`/posts/author/${user.id}`}>
            <Button type="button" className="bg-primary text-white dark:bg-white dark:text-primary">
              View all posts
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};
