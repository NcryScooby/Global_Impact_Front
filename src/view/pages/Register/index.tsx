import { useRegisterController } from './useRegisterController';
import { Button } from '../../components/Button';
import { Select } from '../../components/Select';
import { Input } from '../../components/Input';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Job {
  id: string;
  name: string;
}

export const Register = () => {
  const { handleSubmit, register, errors, isLoading } = useRegisterController();
  const [jobs, setJobs] = useState<Job[]>([]);

  const teste = async () => {
    await axios.get('http://localhost:3001/jobs').then((res) => {
      setJobs(res.data.jobs);
    });
  };

  useEffect(() => {
    teste();
  }, []);

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
          placeholder="Name"
          error={errors.name?.message}
          {...register('name')}
        />
        <Input
          placeholder="E-mail"
          error={errors.email?.message}
          {...register('email')}
        />
        <Input
          type="password"
          error={errors.password?.message}
          placeholder="Password"
          autoComplete="password"
          {...register('password')}
        />
        <Select
          placeholder="Your Job"
          error={errors.jobId?.message}
          options={jobs}
          {...register('jobId')}
        />
        <Button type="submit" className="mt-2" isloading={isLoading}>
          Create account
        </Button>
      </form>
    </>
  );
};
