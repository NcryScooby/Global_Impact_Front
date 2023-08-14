import { CreateCommentData } from '../../../../app/services/comments/create';
import { ErrorResponse } from '../../../../app/interfaces/ErrorResponse';
import { commentsService } from '../../../../app/services/comments';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { z } from 'zod';

const schema = z.object({
  content: z
    .string()
    .nonempty('Content cannot be empty')
    .min(3, 'Content must be at least 3 characters'),
});

type FormData = z.infer<typeof schema>;

export const usePostDetailController = (
  postId: string,
  setOpenDialog: (open: boolean) => void
) => {
  const queryClient = useQueryClient();

  const {
    register,
    reset,
    handleSubmit: hookFormSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (data: CreateCommentData) => {
      return commentsService.create(data);
    },

    onSuccess: async () => {
      await queryClient.refetchQueries(['getPostById', postId]);
      reset({
        content: '',
      });
    },
  });

  const handleSubmit = hookFormSubmit(async (data: FormData) => {
    try {
      await mutateAsync({ ...data, postId });
      toast.success('Comment created successfully');
      setOpenDialog(false);
    } catch (error) {
      toast.error((error as ErrorResponse).response.data.message);
    }
  });

  return { handleSubmit, register, reset, errors, isLoading };
};
