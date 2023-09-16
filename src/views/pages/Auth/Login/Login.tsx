import { disableEnterKeySubmit } from '@utils/helpers/disableEnterKeySubmit';
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { useLoginController } from './useLoginController';
import { Button } from '@components/ui/Button';
import { Input } from '@components/ui/Input';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export const Login = () => {
  const { handleSubmit, register, errors, isLoading } = useLoginController();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <>
      <header className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900 tracking-[-1px] dark:text-white">
          Login to your account
        </h1>

        <p className="space-x-2">
          <span className="text-gray-600 tracking-[-0.5px]">New around here?</span>
          <Link
            to={'/register'}
            className="text-blue-500 hover:underline tracking-[-0.5px] font-medium"
          >
            Create an account
          </Link>
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        onKeyDown={disableEnterKeySubmit}
        className="mt-[60px] flex flex-col gap-4"
      >
        <Input
          type="email"
          label="E-mail"
          error={errors.email?.message}
          autoComplete="on"
          {...register('email')}
        />
        <Input
          type={showPassword ? 'text' : 'password'}
          label="Password"
          error={errors.password?.message}
          iconStyle="top-[41px] right-0.5 cursor-pointer"
          icon={
            showPassword ? (
              <EyeOpenIcon width={14} onClick={() => setShowPassword(false)} />
            ) : (
              <EyeClosedIcon width={14} onClick={() => setShowPassword(true)} />
            )
          }
          autoComplete="on"
          {...register('password')}
        />
        <Button
          type="submit"
          className="mt-2 dark:bg-white dark:text-primary"
          spinnerStyle="dark:text-white dark:fill-primary"
          isLoading={isLoading}
        >
          Login
        </Button>
      </form>
    </>
  );
};
