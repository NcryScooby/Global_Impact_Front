import { TextArea } from '../../../components/ui/TextArea';
import { useAuth } from '../../../../app/hooks/UseAuth';
import { Button } from '../../../components/ui/Button';
import { Select } from '../../../components/ui/Select';
import { Sidebar } from '../../../components/ui/Sidebar';
import { Input } from '../../../components/ui/Input';

export const NewPost = () => {
  const { signOut, userName } = useAuth();
  return (
    <>
      <Sidebar signOut={signOut} userName={userName} />
      <div className="sm:ml-64">
        <section className="py-10 bg-gray-100 sm:py-16">
          <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
                Create New Post
              </h2>
              <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-500">
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet sint. Velit officia consequat duis.
              </p>
            </div>

            <div className="max-w-5xl mx-auto mt-12 sm:mt-16">
              <div className="mt-6 overflow-hidden bg-white rounded-[4px]">
                <div className="px-6 py-12 sm:p-12">
                  <form action="#" method="POST" className="mt-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
                      <div>
                        <Input
                          type="text"
                          placeholder="Title"
                          // error={errors.email?.message}
                          // {...register('email')}
                        />
                      </div>

                      <div>
                        <Select
                          placeholder="Category"
                          // error={errors.jobId?.message}
                          // options={jobs}
                          // {...register('jobId')}
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <TextArea placeholder="Content" />
                      </div>

                      <div>
                        <Input
                          type="text"
                          placeholder="Tags"
                          // error={errors.email?.message}
                          // {...register('email')}
                        />
                      </div>

                      <div>
                        <Input
                          type="file"
                          placeholder="Image"
                          // error={errors.email?.message}
                          // {...register('email')}
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <Button className="w-full">Create</Button>
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
