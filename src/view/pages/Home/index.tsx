import { useAuth } from '../../../app/hooks/useAuth';
import { Sidebar } from '../../components/Sidebar';
import { Posts } from '../../components/Posts';

export const Home = () => {
  const { signOut } = useAuth();

  return (
    <>
      <Sidebar signOut={signOut} />
      <Posts />
    </>
  );
};
