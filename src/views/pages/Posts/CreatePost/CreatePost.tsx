import { GetAllCategoriesResponse } from '@services/categoriesService/getAll';
import { disableEnterKeySubmit } from '@utils/helpers/disableEnterKeySubmit';
import { useCreatePostController } from './useCreatePostController';
import { categoriesService } from '@services/categoriesService';
import { InputFile } from '@components/ui/InputFile';
import { InputTag } from '@components/ui/InputTag';
import { TextArea } from '@components/ui/TextArea';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@components/ui/Button';
import { Select } from '@components/ui/Select';
import { ChangeEvent, useState } from 'react';
import { Input } from '@components/ui/Input';
import { CACHE_TIME } from '@constants';

export const CreatePost = () => {
  const { handleSubmit, reset, register, setValue, errors, isLoading } = useCreatePostController();

  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);

  const {
    data: categories,
    isFetching,
    isSuccess,
  } = useQuery<GetAllCategoriesResponse>({
    queryKey: ['getCategories'],
    queryFn: () => categoriesService.getAll(),
    staleTime: CACHE_TIME.FIFTEEN_MINUTES,
  });

  const resetFormValues = () => {
    reset({
      title: '',
      content: '',
      tags: '',
      image: '',
    });
    setSelectedFile(null);
    setSelectedOption('');
    setTags([]);
  };

  const handleSelectedFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const [file] = event.target.files || [];
    if (file) {
      setSelectedFile(file.name);
    }
  };

  const handleChangeSelectedOption = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <>
      <div className="sm:ml-64">
        <section>
          <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="max-w-5xl mx-auto mt-12 sm:mt-16">
              <div className="mt-6 overflow-hidden rounded-[2px]">
                <div className="px-6 py-12 sm:p-12">
                  <form
                    onSubmit={handleSubmit}
                    onKeyDown={disableEnterKeySubmit}
                    className="flex flex-col gap-4"
                  >
                    <div className="max-w-2xl mx-auto text-center mb-12">
                      <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-3xl lg:text-4xl dark:text-white">
                        Create your new post
                      </h2>
                      <p className="max-w-xl mx-auto mt-4 text-[14px] leading-relaxed text-gray-500">
                        Choose information to build your post on{' '}
                        <span className="text-primary dark:text-white">Global Impact</span>
                      </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
                      <div>
                        <Input
                          type="text"
                          label="Title"
                          error={errors.title?.message}
                          {...register('title')}
                        />
                      </div>

                      <div>
                        <Select
                          label="Category"
                          placeholder="Category"
                          selectedOption={selectedOption}
                          isLoading={isFetching}
                          isSuccess={isSuccess}
                          handleChangeSelectedOption={handleChangeSelectedOption}
                          error={errors.categoryId?.message}
                          options={categories ? categories.categories : []}
                          {...register('categoryId')}
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <TextArea
                          label="Content"
                          error={errors.content?.message}
                          {...register('content')}
                        />
                      </div>

                      <div>
                        <InputTag
                          label="Tags"
                          tags={tags}
                          setTags={setTags}
                          setValue={setValue as (name: string, value: string[]) => void}
                          {...register('tags')}
                        />
                      </div>

                      <div>
                        <InputFile
                          id="image"
                          type="file"
                          label="Image"
                          selectedFile={selectedFile}
                          handleSelectedFileChange={handleSelectedFileChange}
                          error={errors.image?.message?.toString()}
                          {...register('image')}
                        />
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Button
                        className="w-1/3 mt-8 bg-transparent text-primary border border-gray-300 active:bg-transparent dark:text-white dark:border-black-500"
                        onClick={resetFormValues}
                        type="button"
                      >
                        Cancel
                      </Button>
                      <Button
                        className="w-2/3 mt-8 dark:text-primary dark:bg-white"
                        disabled={isFetching}
                        isLoading={isLoading}
                        spinnerStyle="text-primary fill-white dark:text-white dark:fill-primary"
                      >
                        Create
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
