import { useAuth } from '../../../app/hooks/useAuth';
import { Sidebar } from '../../components/Sidebar';

export const Settings = () => {
  const { signOut } = useAuth();

  return <Sidebar signOut={signOut} />;
};
