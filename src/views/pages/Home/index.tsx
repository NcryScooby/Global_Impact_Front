import browser from '../../../assets/images/browserframe.svg';
import mobile from '../../../assets/images/mobileframe.svg';
import { Sidebar } from '../../components/ui/Sidebar';
import { useAuth } from '../../../app/hooks/UseAuth';
import { Link } from 'react-router-dom';

export const Home = () => {
  const { signOut, userName } = useAuth();

  return (
    <>
      <Sidebar signOut={signOut} userName={userName} />
      <div className="sm:ml-64 sm:flex sm:flex-col">
        <div className="h-screen relative lg:grid lg:grid-cols-2">
          <div className="items-center p-8 lg:p-0 lg:ml-24 lg:mt-48 flex flex-col gap-4 lg:items-start">
            <h1 className="text-4xl text-primary lg:text-6xl font-inter font-semibold tracking-[-2.4px]">
              Stay informed, Stay curious.
            </h1>
            <h4 className="max-w-xl mx-auto mt-4 text-[14px] leading-relaxed text-gray-500 lg:mx-0 lg:w-[500px] lg:pr-16">
              Dive deep into the heart of current events with the Global Impact
              blog, where we curate the most recent and significant world news,
              paired with comprehensive insights and expert analyses.
            </h4>
            <Link
              to={'/posts'}
              className="px-4 py-3 bg-primary text-white rounded-[2px] mt-4 hover:bg-gray-900"
            >
              See the posts
            </Link>
          </div>
          <div className="absolute bottom-0 right-0">
            <img
              src={browser}
              alt="browser"
              className="w-[250px] lg:w-[500px] select-none"
            />
          </div>
          <div className="absolute bottom-0 right-36">
            <img
              src={mobile}
              alt="mobile"
              className="w-[250px] lg:w-[500px] select-none"
            />
          </div>
        </div>
      </div>
    </>
  );
};
