import { PageNotFound } from '@components/animations/PageNotFound';
import { Link } from 'react-router-dom';

interface NotFoundProps {
  status: number;
  title: string;
  model: string;
}

export const NotFound = ({ status, title, model }: NotFoundProps) => {
  return (
    <div className="h-full w-full flex items-center justify-center flex-col gap-4 dark:text-gray-300">
      <h1 className="text-4xl font-bold">{status}</h1>
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div className="text-center text-sm font-light">
        <p>Sorry, we cant find the {model} you are looking for</p>
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
