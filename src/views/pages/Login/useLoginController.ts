import { SignInData } from '../../../app/services/authService/signIn';
import { ResponseError } from '../../../app/interfaces/ResponseError';
import { authService } from '../../../app/services/authService';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../../../app/hooks/UseAuth';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { z } from 'zod';

const schema = z.object({
  email: z
    .string()
    .nonempty('Email cannot be empty')
    .email('Enter a valid email address'),
  password: z
    .string()
    .nonempty('Password cannot be empty')
    .min(8, 'Password must be at least 8 characters'),
});

type FormData = z.infer<typeof schema>;

export const useLoginController = () => {
  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (data: SignInData) => {
      return authService.signIn(data);
    },
  });

  const { signIn } = useAuth();

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      const { token } = await mutateAsync(data);
      signIn(token);
    } catch (error) {
      toast.error((error as ResponseError).response.data.message);
    }
  });

  return { handleSubmit, register, errors, isLoading };
};
