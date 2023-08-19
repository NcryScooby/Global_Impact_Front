import { useLoginController } from './useLoginController';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Link } from 'react-router-dom';

export const Login = () => {
  const { handleSubmit, register, errors, isLoading } = useLoginController();

  return (
    <>
      <header className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900 tracking-[-1px]">
          Login to your account
        </h1>

        <p className="space-x-2">
          <span className="text-gray-600 tracking-[-0.5px]">
            New around here?
          </span>
          <Link
            to={'/register'}
            className="text-blue-500 hover:underline tracking-[-0.5px] font-medium"
          >
            Create an account
          </Link>
        </p>
      </header>

      <form onSubmit={handleSubmit} className="mt-[60px] flex flex-col gap-4">
        <Input
          type="email"
          label="E-mail"
          error={errors.email?.message}
          {...register('email')}
        />
        <Input
          type="password"
          label="Password"
          autoComplete="password"
          error={errors.password?.message}
          {...register('password')}
        />
        <Button type="submit" className="mt-2" isLoading={isLoading}>
          Login
        </Button>
      </form>
    </>
  );
};
