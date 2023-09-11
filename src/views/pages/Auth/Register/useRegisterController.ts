import { IErrorResponse } from '@interfaces/errors/IErrorResponse';
import { SignUpData } from '@services/authService/signUp';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { authService } from '@services/authService';
import { ACCEPTED_IMAGE_TYPES } from '@constants';
import { useForm } from 'react-hook-form';
import { useAuth } from '@hooks/useAuth';
import { toast } from 'react-hot-toast';
import { z } from 'zod';

const schema = z.object({
  name: z.string().nonempty('Name cannot be empty').min(3, 'Name must be at least 3 characters'),
  email: z.string().nonempty('Email cannot be empty').email('Enter a valid email address'),
  password: z
    .string()
    .nonempty('Password cannot be empty')
    .min(8, 'Password must be at least 8 characters'),
  jobId: z.string().nonempty('Job cannot be empty').uuid('Invalid job'),
  avatar: z
    .any()
    .refine((files) => files?.length == 1, 'Avatar is required')
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      '.jpg, .jpeg, .png and .webp files are accepted'
    ),
});

type FormData = z.infer<typeof schema>;

export const useRegisterController = () => {
  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (data: SignUpData) => {
      return authService.signUp(data);
    },
  });

  const { signIn } = useAuth();

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('password', data.password);
      formData.append('jobId', data.jobId);
      formData.append('avatar', data.avatar?.[0]);

      const { token } = await mutateAsync(formData as unknown as SignUpData);
      signIn(token);
    } catch (error) {
      toast.error((error as IErrorResponse).response.data.message);
    }
  });

  return { handleSubmit, register, errors, isLoading };
};
