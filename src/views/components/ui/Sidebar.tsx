import {
  ExitIcon,
  HomeIcon,
  Pencil2Icon,
  LayoutIcon,
} from '@radix-ui/react-icons';
import { useLocation } from 'react-router-dom';
import { env } from '../../../app/config/env';
import { Link } from 'react-router-dom';
import { Avatar } from '@mui/material';

interface SidebarProps {
  signOut: () => void;
  userAvatar: string;
}

export const Sidebar = ({ signOut, userAvatar }: SidebarProps) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <>
      <button
        data-drawer-target="separator-sidebar"
        data-drawer-toggle="separator-sidebar"
        aria-controls="separator-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm rounded-lg sm:hidden focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="separator-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-primary">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to={'/'}
                className={`flex items-center p-2 rounded-lg text-white hover:bg-gray-900 group ${
                  currentPath === '/' ? 'bg-gray-900' : ''
                }`}
              >
                <HomeIcon
                  className={`w-5 h-5 transition duration-75 text-gray-400  group-hover:text-white ${
                    currentPath === '/' ? 'bg-gray-900 text-white' : ''
                  }`}
                />
                <span className="ml-3">Home</span>
              </Link>
            </li>
          </ul>
          <ul className="pt-4 mt-4 space-y-2 font-medium border-gray-900">
            <li>
              <Link
                to={'/posts'}
                className={`flex items-center p-2 transition duration-75 rounded-lg hover:bg-gray-900 text-white group ${
                  currentPath === '/posts' ? 'bg-gray-900' : ''
                }`}
              >
                <LayoutIcon
                  className={`flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 hover:bg-gray-900 group-hover:text-white ${
                    currentPath === '/posts' ? 'bg-gray-900 text-white' : ''
                  }`}
                />
                <span className="ml-3">Posts</span>
              </Link>
            </li>
            <li>
              <Link
                to={'/posts/new'}
                className={`flex items-center p-2 transition duration-75 rounded-lg hover:bg-gray-900 text-white group ${
                  currentPath === '/posts/new' ? 'bg-gray-900' : ''
                }`}
              >
                <Pencil2Icon
                  className={`flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 hover:bg-gray-900 group-hover:text-white ${
                    currentPath === '/posts/new' ? 'bg-gray-900 text-white' : ''
                  }`}
                />
                <span className="ml-3">New Post</span>
              </Link>
            </li>
            <li>
              <button
                onClick={signOut}
                className="flex items-center p-2 transition duration-75 rounded-lg w-full hover:bg-gray-900 text-white group"
              >
                <ExitIcon className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 hover:bg-gray-900 group-hover:text-white" />
                <span className="ml-3">Sign Out</span>
              </button>
            </li>
            <li className="flex-1 fixed bottom-4">
              <Avatar
                alt="User avatar"
                src={`${env.apiUrl}/uploads/users/${userAvatar}`}
                sx={{
                  border: '1px solid #fff',
                }}
              />
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};
