import { ResponseError } from '../../../../app/interfaces/ResponseError';
import { postsService } from '../../../../app/services/postsService';
import { Post } from '../../../../app/services/postsService/create';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

const schema = z.object({
  title: z
    .string()
    .nonempty('Name cannot be empty')
    .min(3, 'Name must be at least 3 characters'),
  content: z.string().nonempty('Content cannot be empty').min(3),
  categoryId: z
    .string()
    .nonempty('Category cannot be empty')
    .uuid('Invalid Category'),
  image: z
    .any()
    .refine((files) => files?.length == 1, 'Image is required.')
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      '.jpg, .jpeg, .png and .webp files are accepted.'
    ),
  tags: z.any(),
});

type FormData = z.infer<typeof schema>;

export const useNewPostController = () => {
  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (data: Post) => {
      return postsService.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'getPosts',
      });
    },
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('content', data.content);
      formData.append('categoryId', data.categoryId);
      formData.append('image', data.image?.[0]);

      const tagsArray = data.tags ? data.tags.split(',') : [];
      tagsArray.forEach((tag: string, index: number) => {
        formData.append(`tags[${index}]`, tag.trim());
      });

      const { post } = await mutateAsync(formData as unknown as Post);
      navigate(`/posts/${post.id}`);
    } catch (error) {
      toast.error((error as ResponseError).response.data.message);
    }
  });

  return { handleSubmit, register, errors, isLoading };
};