import type { IErrorResponse } from '@interfaces/errors/IErrorResponse';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreatePostData } from '@services/postsService/create';
import { zodResolver } from '@hookform/resolvers/zod';
import { postsService } from '@services/postsService';
import { ACCEPTED_IMAGE_TYPES } from '@constants';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { z } from 'zod';

const schema = z.object({
  title: z.string().nonempty('Name cannot be empty').min(3, 'Name must be at least 3 characters'),
  content: z.string().nonempty('Content cannot be empty').min(3),
  categoryId: z.string().nonempty('Category cannot be empty').uuid('Invalid Category'),
  image: z
    .any()
    .refine((files) => files?.length == 1, 'Image is required')
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      '.jpg, .jpeg, .png and .webp files are accepted'
    ),
  tags: z.any(),
});

type FormData = z.infer<typeof schema>;

export const useCreatePostController = () => {
  const {
    register,
    reset,
    handleSubmit: hookFormSubmit,
    setValue,
    formState: { errors },
    clearErrors,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (data: CreatePostData) => {
      return postsService.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['getPosts']);
      queryClient.invalidateQueries(['getUserByUsername']);
    },
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('content', data.content);
      formData.append('categoryId', data.categoryId);
      formData.append('image', data.image?.[0]);

      if (data.tags) {
        data.tags.forEach((tag: string) => {
          formData.append('tags[]', tag);
        });
      }

      const { post } = await mutateAsync(formData as unknown as CreatePostData);
      navigate(`/posts/${post.id}`);
    } catch (error) {
      toast.error((error as IErrorResponse).response.data.message);
    }
  });

  return { handleSubmit, register, setValue, reset, errors, isLoading, clearErrors };
};
