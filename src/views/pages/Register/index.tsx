import { GetAllJobsResponse } from '../../../app/services/jobsService/getAll';
import { useRegisterController } from './useRegisterController';
import { jobsService } from '../../../app/services/jobsService';
import { Button } from '../../components/ui/Button';
import { Select } from '../../components/ui/Select';
import { Input } from '../../components/ui/Input';
import { useQuery } from '@tanstack/react-query';
import { ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';

export const Register = () => {
  const { handleSubmit, register, errors, isLoading } = useRegisterController();

  const [selectedOption, setSelectedOption] = useState<string>('');

  const { data: jobs, isFetching } = useQuery<GetAllJobsResponse>({
    queryKey: ['getJobs'],
    queryFn: () => jobsService.getAll(),
    staleTime: 1000 * 60 * 5,
  });

  const handleChangeSelectedOption = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedOption(event.target.value);
  };

  return (
    <>
      <header className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900 tracking-[-1px]">
          Create your account
        </h1>

        <p className="space-x-2">
          <span className="text-gray-600 tracking-[-0.5px]">
            Already have an account?
          </span>
          <Link
            to={'/login'}
            className="text-blue-500 hover:underline tracking-[-0.5px] font-medium"
          >
            Enter
          </Link>
        </p>
      </header>

      <form onSubmit={handleSubmit} className="mt-[60px] flex flex-col gap-4">
        <Input
          label="Name"
          error={errors.name?.message}
          {...register('name')}
        />
        <Input
          label="E-mail"
          error={errors.email?.message}
          {...register('email')}
        />
        <Input
          label="Password"
          type="password"
          error={errors.password?.message}
          autoComplete="password"
          {...register('password')}
        />
        <Select
          label="Job"
          placeholder="Job"
          selectedOption={selectedOption}
          isLoading={isFetching}
          handleChangeSelectedOption={handleChangeSelectedOption}
          error={errors.jobId?.message}
          options={jobs ? jobs.jobs : []}
          {...register('jobId')}
        />
        <Button type="submit" className="mt-2" isloading={isLoading}>
          Create account
        </Button>
      </form>
    </>
  );
};
