import { useAuth } from '../../../app/hooks/useAuth';
import { Sidebar } from '../../components/Sidebar';

export const NewPost = () => {
  const { signOut, userName } = useAuth();
  return (
    <>
      <Sidebar signOut={signOut} userName={userName} />
    </>
  );
};
