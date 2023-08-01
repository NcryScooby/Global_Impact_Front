import { useAuth } from '../../../app/hooks/UseAuth';
import { Sidebar } from '../../components/ui/Sidebar';
import { Card } from '../../components/ui/Card';

export const Posts = () => {
  const { signOut, userName } = useAuth();

  return (
    <>
      <Sidebar signOut={signOut} userName={userName} />
      <Card />
    </>
  );
};
