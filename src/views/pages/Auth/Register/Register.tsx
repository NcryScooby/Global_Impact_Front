import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { GetAllJobsResponse } from '@services/jobsService/getAll';
import { useRegisterController } from './useRegisterController';
import { InputFile } from '@components/ui/InputFile';
import { jobsService } from '@services/jobsService';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@components/ui/Button';
import { Select } from '@components/ui/Select';
import { ChangeEvent, useState } from 'react';
import { Input } from '@components/ui/Input';
import { Link } from 'react-router-dom';

export const Register = () => {
  const { handleSubmit, register, errors, isLoading } = useRegisterController();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>('');

  const {
    data: jobs,
    isFetching,
    isSuccess,
  } = useQuery<GetAllJobsResponse>({
    queryKey: ['getJobs'],
    queryFn: () => jobsService.getAll(),
    staleTime: 1000 * 60 * 5,
  });

  const handleChangeSelectedOption = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleSelectedFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const [file] = event.target.files || [];
    if (file) {
      setSelectedFile(file.name);
    }
  };

  return (
    <>
      <header className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900 tracking-[-1px] dark:text-white">
          Create your account
        </h1>

        <p className="space-x-2">
          <span className="text-gray-600 tracking-[-0.5px]">Already have an account?</span>
          <Link
            to={'/login'}
            className="text-blue-500 hover:underline tracking-[-0.5px] font-medium"
          >
            Enter
          </Link>
        </p>
      </header>

      <form onSubmit={handleSubmit} className="mt-[60px] flex flex-col gap-4">
        <Input label="Name" error={errors.name?.message} {...register('name')} />
        <Input label="E-mail" error={errors.email?.message} {...register('email')} />
        <Input
          type={showPassword ? 'text' : 'password'}
          label="Password"
          autoComplete="password"
          error={errors.password?.message}
          iconStyle="top-[41px] right-0.5 cursor-pointer"
          icon={
            showPassword ? (
              <EyeOpenIcon width={14} onClick={() => setShowPassword(false)} />
            ) : (
              <EyeClosedIcon width={14} onClick={() => setShowPassword(true)} />
            )
          }
          {...register('password')}
        />
        <Select
          label="Job"
          placeholder="Job"
          selectedOption={selectedOption}
          isLoading={isFetching}
          isSuccess={isSuccess}
          handleChangeSelectedOption={handleChangeSelectedOption}
          error={errors.jobId?.message}
          options={jobs ? jobs.jobs : []}
          {...register('jobId')}
        />
        <InputFile
          id="avatar"
          type="file"
          label="Avatar"
          selectedFile={selectedFile}
          handleSelectedFileChange={handleSelectedFileChange}
          error={errors.avatar?.message?.toString()}
          {...register('avatar')}
        />
        <Button
          type="submit"
          className="mt-2 dark:bg-white dark:text-primary"
          spinnerStyle="dark:text-white dark:fill-primary"
          isLoading={isLoading}
        >
          Create account
        </Button>
      </form>
    </>
  );
};
