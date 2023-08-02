import { useAuth } from '../../../app/hooks/UseAuth';
import { Sidebar } from '../../components/ui/Sidebar';
import { Blog } from '../../components/animations/Blog';

export const Home = () => {
  const { signOut, userName } = useAuth();

  return (
    <>
      <Sidebar signOut={signOut} userName={userName} />
      <div className="sm:ml-64 sm:flex sm:flex-col">
        <div className="py-16 lg:px-8 lg:flex lg:items-start lg:justify-center">
          <div>
            <h1 className="text-3xl font-bold text-zinc-800 lg:text-5xl">
              Welcome to <span className="text-black">Global Impact</span>.
            </h1>
            <div className="mt-16 text-gray-600 flex flex-col gap-6">
              <p>
                In an increasingly connected world, where borders fade away, and
                ideas travel at the speed of light, our virtual space is born to
                share, inspire, and amplify the positive impact we can make on
                the planet.
              </p>
              <p>
                At Global Impact we believe in the power of information,
                empathy, and collective action. This blog is an open platform
                for all those who seek to make a difference, whether they are
                engaged individuals, visionary organizations, or simply curious
                minds eager to learn about the challenges our world faces and
                the innovative solutions that are transforming realities.
              </p>
              <p>
                We are committed to building a global community that values
                cooperation, diverse perspectives, and the pursuit of a brighter
                future for generations to come. Join us on this journey, as we
                believe that every positive action, no matter how small it may
                seem, can trigger a transformative impact on the world. Welcome
                to Global Impact - where knowledge turns into action, and change
                happens. Together, let&apos;s inspire, connect, and build a
                better world.
              </p>
            </div>
          </div>
          <div>
            <Blog />
          </div>
        </div>
      </div>
    </>
  );
};
