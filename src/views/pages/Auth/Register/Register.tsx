import { disableEnterKeySubmit } from '@utils/helpers/disableEnterKeySubmit';
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { GetAllJobsResponse } from '@services/jobsService/getAll';
import { useRegisterController } from './useRegisterController';
import { InputFile } from '@components/ui/InputFile';
import { jobsService } from '@services/jobsService';
import { TextArea } from '@components/ui/TextArea';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@components/ui/Button';
import { Select } from '@components/ui/Select';
import { ChangeEvent, useState } from 'react';
import { Input } from '@components/ui/Input';
import { Link } from 'react-router-dom';
import { countriesList } from '@mocks';

export const Register = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [jobSelectedOption, setJobSelectedOption] = useState<string>('');
  const [countrySelectedOption, setCountrySelectedOption] = useState<string>('');
  const [currentStep, setCurrentStep] = useState<number>(1);
  const {
    handleSubmit,
    signUpLoading,
    errorsStepOne,
    errorsStepTwo,
    validateEmailLoading,
    validateUsernameLoading,
    registerStepOne,
    registerStepTwo,
    clearErrors,
  } = useRegisterController(currentStep, setCurrentStep);

  const {
    data: jobs,
    isFetching,
    isSuccess,
  } = useQuery<GetAllJobsResponse>({
    queryKey: ['getJobs'],
    queryFn: () => jobsService.getAll(),
    staleTime: 1000 * 60 * 5,
  });

  const countries = countriesList.map((country) => ({
    id: country.name,
    name: country.name,
  }));

  const handleChangeJobSelectedOption = (event: ChangeEvent<HTMLSelectElement>) => {
    setJobSelectedOption(event.target.value);
    clearErrors('jobId');
  };

  const handleChangeCountrySelectedOption = (event: ChangeEvent<HTMLSelectElement>) => {
    setCountrySelectedOption(event.target.value);
    clearErrors('countryOfBirth');
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

      <form
        onSubmit={handleSubmit}
        onKeyDown={disableEnterKeySubmit}
        className="mt-[60px] flex flex-col gap-4"
      >
        {currentStep === 1 ? (
          <>
            <Input
              label="Username"
              error={errorsStepOne.username?.message}
              autoComplete="off"
              {...registerStepOne('username')}
            />
            <Input
              label="Name"
              error={errorsStepOne.name?.message}
              autoComplete="off"
              {...registerStepOne('name')}
            />
            <Input
              label="E-mail"
              error={errorsStepOne.email?.message}
              autoComplete="off"
              {...registerStepOne('email')}
            />
            <Input
              type={showPassword ? 'text' : 'password'}
              label="Password"
              error={errorsStepOne.password?.message}
              iconStyle="top-[41px] right-0.5 cursor-pointer"
              icon={
                showPassword ? (
                  <EyeOpenIcon width={14} onClick={() => setShowPassword(false)} />
                ) : (
                  <EyeClosedIcon width={14} onClick={() => setShowPassword(true)} />
                )
              }
              autoComplete="off"
              {...registerStepOne('password')}
            />
          </>
        ) : (
          <>
            <Select
              label="Job"
              placeholder="Job"
              selectedOption={jobSelectedOption}
              isLoading={isFetching}
              isSuccess={isSuccess}
              handleChangeSelectedOption={handleChangeJobSelectedOption}
              error={errorsStepTwo.jobId?.message}
              options={jobs ? jobs.jobs : []}
              {...registerStepTwo('jobId')}
            />
            <InputFile
              id="avatar"
              type="file"
              label="Avatar"
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
              handleSelectedFileChange={handleSelectedFileChange}
              error={errorsStepTwo.avatar?.message?.toString()}
              {...registerStepTwo('avatar')}
            />
            <Select
              label="Country"
              placeholder="Country"
              selectedOption={countrySelectedOption}
              handleChangeSelectedOption={handleChangeCountrySelectedOption}
              error={errorsStepTwo.countryOfBirth?.message}
              options={countries}
              {...registerStepTwo('countryOfBirth')}
            />
            <TextArea label="Bio" error={errorsStepTwo.bio?.message} {...registerStepTwo('bio')} />
          </>
        )}
        {currentStep === 2 ? (
          <>
            <div className="flex justify-between mt-2 gap-2">
              <Button
                onClick={() => setCurrentStep(1)}
                type="button"
                className="w-44 bg-transparent text-primary border border-gray-300 active:bg-transparent dark:text-white dark:border-black-500"
                spinnerStyle="dark:text-white dark:fill-primary"
              >
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                type="submit"
                className="w-full dark:bg-white dark:text-primary"
                spinnerStyle="dark:text-white dark:fill-primary"
                isLoading={signUpLoading}
              >
                Create account
              </Button>
            </div>
          </>
        ) : (
          <Button
            onClick={handleSubmit}
            type="submit"
            className="mt-2 dark:bg-white dark:text-primary"
            spinnerStyle="dark:text-white dark:fill-primary"
            isLoading={validateEmailLoading || validateUsernameLoading}
          >
            Next
          </Button>
        )}
      </form>
    </>
  );
};
