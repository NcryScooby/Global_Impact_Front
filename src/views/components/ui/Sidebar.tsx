import { ExitIcon, HomeIcon, Pencil2Icon, LayoutIcon } from '@radix-ui/react-icons';
import { useSidebar } from '../../../app/hooks/useSidebar';
import { useLocation } from 'react-router-dom';
import { env } from '../../../app/config/env';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from '@mui/material';

interface SidebarProps {
  signOut: () => void;
  userAvatar: string;
}

export const Sidebar = ({ signOut, userAvatar }: SidebarProps) => {
  const { isOpen, setIsOpen } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const postId = currentPath.split('/')[2];
  const categoryId = currentPath.split('/')[3];
  const sidebarRef = useRef<HTMLElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node) &&
      !buttonRef.current?.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const handleSignOut = () => {
    setIsOpen(false);
    signOut();
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        data-drawer-target="separator-sidebar"
        data-drawer-toggle="separator-sidebar"
        aria-controls="separator-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm rounded-lg sm:hidden focus:outline-none text-gray-400"
      >
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
        ref={sidebarRef}
        id="separator-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ease-in-out duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-primary">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to={'/'}
                onClick={() => {
                  setIsOpen(false);
                }}
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
                onClick={() => {
                  setIsOpen(false);
                }}
                className={`flex items-center p-2 transition duration-75 rounded-lg hover:bg-gray-900 text-white group ${
                  (currentPath === '/posts' ||
                    currentPath === `/posts/${postId}` ||
                    currentPath === `/posts/categories/${categoryId}`) &&
                  currentPath !== '/posts/create'
                    ? 'bg-gray-900'
                    : ''
                }`}
              >
                <LayoutIcon
                  className={`flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 hover:bg-gray-900 group-hover:text-white ${
                    (currentPath === '/posts' ||
                      currentPath === `/posts/${postId}` ||
                      currentPath === `/posts/categories/${categoryId}`) &&
                    currentPath !== '/posts/create'
                      ? 'bg-gray-900 text-white'
                      : ''
                  }`}
                />
                <span className="ml-3">Posts</span>
              </Link>
            </li>
            <li>
              <Link
                to={'/posts/create'}
                onClick={() => {
                  setIsOpen(false);
                }}
                className={`flex items-center p-2 transition duration-75 rounded-lg hover:bg-gray-900 text-white group ${
                  currentPath === '/posts/create' ? 'bg-gray-900' : ''
                }`}
              >
                <Pencil2Icon
                  className={`flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 hover:bg-gray-900 group-hover:text-white ${
                    currentPath === '/posts/create' ? 'bg-gray-900 text-white' : ''
                  }`}
                />
                <span className="ml-3">Create Post</span>
              </Link>
            </li>
            <ul className="pt-4 mt-4 space-y-2 font-medium border-gray-900">
              <li>
                <button
                  onClick={handleSignOut}
                  className="flex items-center p-2 transition duration-75 rounded-lg w-full hover:bg-gray-900 text-white group"
                >
                  <ExitIcon className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 hover:bg-gray-900 group-hover:text-white" />
                  <span className="ml-3">Sign Out</span>
                </button>
              </li>
            </ul>
            <li className="flex-1 fixed bottom-4">
              <Avatar
                alt="User avatar"
                src={userAvatar ? `${env.apiUrl}/uploads/users/${userAvatar}` : ''}
                sx={{
                  border: '0.5px solid #fff',
                }}
              />
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};
