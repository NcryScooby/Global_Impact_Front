import { PageNotFound } from '@components/animations/PageNotFound';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div className="h-full w-full flex items-center justify-center flex-col gap-4 dark:text-gray-300">
      <h1 className="text-4xl font-bold">404</h1>
      <h2 className="text-2xl font-semibold">Page Not Found</h2>
      <div className="text-center font-light">
        <p>Sorry, we cant find the page you are looking for</p>
        <p>
          Click{' '}
          <Link to={'/'} className="font-bold">
            here
          </Link>{' '}
          to come back to home page.
        </p>
      </div>
      <PageNotFound />
      <footer className="flex items-end">
        <p className="text-center text-gray-500 text-[12px] font-light">© 2023 Global Impact.</p>
      </footer>
    </div>
  );
};
