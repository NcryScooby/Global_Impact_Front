import { useAuth } from '../../../app/hooks/useAuth';
import { Sidebar } from '../../components/Sidebar';
import { Card } from '../../components/Card';

export const Posts = () => {
  const { signOut, userName } = useAuth();

  return (
    <>
      <Sidebar signOut={signOut} userName={userName} />
      <Card />
    </>
  );
};
