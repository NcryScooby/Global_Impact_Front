import {
  ExitIcon,
  HomeIcon,
  Pencil2Icon,
  LayoutIcon,
} from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';

interface SidebarProps {
  signOut: () => void;
  userName: string;
}

export const Sidebar = ({ signOut, userName }: SidebarProps) => {
  const getInitials = (name: string) => {
    return (name.charAt(0) + name.charAt(1)).toUpperCase();
  };

  return (
    <>
      <button
        data-drawer-target="separator-sidebar"
        data-drawer-toggle="separator-sidebar"
        aria-controls="separator-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-primary">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to={'/'}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 group"
              >
                <HomeIcon className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ml-3">Home</span>
              </Link>
            </li>
          </ul>
          <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-zinc-800">
            <li>
              <Link
                to={'/posts'}
                className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 dark:text-white group"
              >
                <LayoutIcon className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:hover:bg-zinc-800 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ml-3">Posts</span>
              </Link>
            </li>
            <li>
              <Link
                to={'/posts/new'}
                className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 dark:text-white group"
              >
                <Pencil2Icon className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:hover:bg-zinc-800 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ml-3">New Post</span>
              </Link>
            </li>
            <li>
              <button
                onClick={signOut}
                className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 w-full dark:hover:bg-zinc-800 dark:text-white group"
              >
                <ExitIcon className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:hover:bg-zinc-800 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ml-3">Sign Out</span>
              </button>
            </li>
            <li className="flex-1 mb-4 fixed bottom-4">
              <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-white cursor-pointer">
                <span className="font-medium text-gray-600 dark:text-primary">
                  {getInitials(userName)}
                </span>
              </div>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};
