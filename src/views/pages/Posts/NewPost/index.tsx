import { categoriesService } from '../../../../app/services/categoriesService';
import { useNewPostController } from './useNewPostController';
import { InputFile } from '../../../components/ui/InputFile';
import { TextArea } from '../../../components/ui/TextArea';
import { ChangeEvent, useEffect, useState } from 'react';
import { Sidebar } from '../../../components/ui/Sidebar';
import { useAuth } from '../../../../app/hooks/UseAuth';
import { Button } from '../../../components/ui/Button';
import { Select } from '../../../components/ui/Select';
import { Input } from '../../../components/ui/Input';

interface Category {
  id: string;
  name: string;
}

export const NewPost = () => {
  const { handleSubmit, reset, register, errors, isLoading } = useNewPostController();
  const { signOut, userName } = useAuth();

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [loading, setLoading] = useState(true);

  const CategoriesData = async () => {
    const { categories } = await categoriesService.getAll();
    setCategories(categories);
    setLoading(false);
  };

  const resetFormValues = () => {
    reset({
      title: '',
      content: '',
      tags: '',
      image: '',
    });

    setSelectedFile(null);
    setSelectedOption('');
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setSelectedFile(file.name);
    }
  };

  const handleChangeSelectedOption = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    CategoriesData();
  }, []);

  return (
    <>
      <Sidebar signOut={signOut} userName={userName} />
      <div className="sm:ml-64">
        <section>
          <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="max-w-5xl mx-auto mt-12 sm:mt-16">
              <div className="mt-6 overflow-hidden bg-white rounded-[2px]">
                <div className="px-6 py-12 sm:p-12">
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="max-w-2xl mx-auto text-center mb-12">
                      <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-3xl lg:text-4xl">
                        Create your new post
                      </h2>
                      <p className="max-w-xl mx-auto mt-4 text-[14px] leading-relaxed text-gray-500">
                        Choose information to build your post on{' '}
                        <span className="text-primary">Global Impact</span>
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
                          isLoading={loading}
                          handleChangeSelectedOption={handleChangeSelectedOption}
                          error={errors.categoryId?.message}
                          options={categories}
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
                        <Input type="text" label="Tags" {...register('tags')} />
                      </div>

                      <div>
                        <InputFile
                          id="image"
                          type="file"
                          label="Image"
                          selectedFile={selectedFile}
                          handleFileChange={handleFileChange}
                          error={errors.image?.message?.toString()}
                          {...register('image')}
                        />
                      </div>
                    </div>
                    <div className='flex gap-4'>
                      <Button className="w-1/3 mt-8 bg-transparent text-primary border border-gray-300 active:bg-transparent" onClick={resetFormValues} type='button'>
                        Cancel
                      </Button>
                      <Button className="w-2/3 mt-8" isloading={isLoading}>
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
