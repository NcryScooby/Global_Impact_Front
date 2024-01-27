import { ValidateUsernameData } from '@services/usersService/validateUsername';
import { ValidateEmailData } from '@services/usersService/validateEmail';
import type { IErrorResponse } from '@interfaces/errors/IErrorResponse';
import { SignUpData } from '@services/authService/signUp';
import { usersService } from '@services/usersService';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { authService } from '@services/authService';
import { ACCEPTED_IMAGE_TYPES } from '@constants';
import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../../app/hooks/useAuth';
import { toast } from 'react-hot-toast';
import { z } from 'zod';

const stepOneSchema = z.object({
  name: z.string().nonempty('Name cannot be empty').min(3, 'Name must be at least 3 characters'),
  username: z
    .string()
    .nonempty('Username cannot be empty')
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must be at most 30 characters')
    .refine((username) => !username.includes(' '), 'Username cannot contain spaces')
    .refine(
      (username) => /^[a-z0-9_]+$/.test(username),
      'Username can only contain lowercase alphanumeric characters and underscores'
    )
    .refine(
      (username) => username === username.toLowerCase(),
      'Username cannot contain uppercase characters'
    ),
  email: z.string().nonempty('Email cannot be empty').email('Enter a valid email address'),
  password: z
    .string()
    .nonempty('Password cannot be empty')
    .min(8, 'Password must be at least 8 characters'),
});

const stepTwoSchema = z.object({
  jobId: z.string().nonempty('Job cannot be empty').uuid('Invalid job'),
  avatar: z
    .any()
    .refine((files) => files?.length == 1, 'Avatar is required')
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      '.jpg, .jpeg, .png and .webp files are accepted'
    ),
  countryOfBirth: z.string().nonempty('Country cannot be empty'),
  bio: z.string().nonempty('Bio cannot be empty'),
});

type FormData = z.infer<typeof stepOneSchema & typeof stepTwoSchema>;

export const useRegisterController = (
  currentStep: number,
  setCurrentStep: Dispatch<SetStateAction<number>>
) => {
  const { signIn } = useAuth();

  const {
    register: registerStepOne,
    handleSubmit: handleSubmitStepOne,
    formState: { errors: errorsStepOne },
    getValues: getValuesStepOne,
  } = useForm<FormData>({
    resolver: zodResolver(stepOneSchema),
  });

  const {
    register: registerStepTwo,
    handleSubmit: handleSubmitStepTwo,
    formState: { errors: errorsStepTwo },
    getValues: getValuesStepTwo,
    clearErrors,
  } = useForm<FormData>({
    resolver: zodResolver(stepTwoSchema),
  });

  const { mutateAsync: signUpMutateAsync, isLoading: signUpLoading } = useMutation({
    mutationFn: async (data: SignUpData) => {
      return authService.signUp(data);
    },
  });

  const { mutateAsync: validateEmailMutateAsync, isLoading: validateEmailLoading } = useMutation({
    mutationFn: async (data: ValidateEmailData) => {
      return usersService.validateEmail(data);
    },
  });

  const { mutateAsync: validateUsernameMutateAsync, isLoading: validateUsernameLoading } =
    useMutation({
      mutationFn: async (data: ValidateUsernameData) => {
        return usersService.validateUsername(data);
      },
    });

  const validateUsername = async (username: string) => {
    const { isUsernameAvailable } = await validateUsernameMutateAsync({ username });
    if (!isUsernameAvailable) {
      throw new Error('Username already registered');
    }
  };

  const validateEmail = async (email: string) => {
    const { isEmailAvailable } = await validateEmailMutateAsync({ email });
    if (!isEmailAvailable) {
      throw new Error('E-mail already registered');
    }
  };

  const handleError = (error: unknown) => {
    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error((error as IErrorResponse).response.data.message);
    }
  };

  const handleNext = handleSubmitStepOne(async (data) => {
    try {
      await validateUsername(data.username);
      await validateEmail(data.email);
      setCurrentStep(2);
    } catch (error) {
      handleError(error);
    }
  });

  const handleSubmit = handleSubmitStepTwo(async (data) => {
    try {
      const combinedData = {
        ...getValuesStepOne(),
        ...data,
      };

      const formData = new FormData();
      formData.append('name', combinedData.name);
      formData.append('username', combinedData.username);
      formData.append('email', combinedData.email);
      formData.append('password', combinedData.password);
      formData.append('jobId', combinedData.jobId);
      if (combinedData.avatar) {
        formData.append('avatar', combinedData.avatar[0]);
      }
      formData.append('countryOfBirth', combinedData.countryOfBirth);
      formData.append('bio', combinedData.bio);

      const { token } = await signUpMutateAsync(formData as unknown as SignUpData);
      signIn(token);
    } catch (error) {
      toast.error((error as IErrorResponse).response.data.message);
    }
  });

  return {
    handleSubmit: currentStep === 1 ? handleNext : handleSubmit,
    registerStepOne,
    signUpLoading,
    errorsStepOne,
    getValuesStepOne,
    handleSubmitStepOne,
    registerStepTwo,
    errorsStepTwo,
    getValuesStepTwo,
    handleSubmitStepTwo,
    validateEmailMutateAsync,
    validateUsernameLoading,
    validateEmailLoading,
    clearErrors,
  };
};
