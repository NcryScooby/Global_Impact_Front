import { ReactNode, createContext, useCallback, useEffect, useState } from 'react';
import { LaunchScreen } from '@components/ui/LaunchScreen';
import { MeResponse } from '@services/usersService/me';
import { usersService } from '@services/usersService';
import { useQuery } from '@tanstack/react-query';
import { localStorageKeys } from '@config/keys';
import { toast } from 'react-hot-toast';

interface AuthContextProps {
  signedIn: boolean;
  userLogged: MeResponse['user'];
  signIn: (token: string) => void;
  signOut: () => void;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storedToken = localStorage.getItem(localStorageKeys.TOKEN);

    return !!storedToken;
  });

  const [userLogged, serUserLogged] = useState<MeResponse['user']>({
    id: '',
    name: '',
    avatar: '',
    email: '',
    job: {
      id: '',
      name: '',
    },
    role: {
      name: '',
    },
  });

  const { data, isError, isFetching, isSuccess, remove } = useQuery({
    queryKey: ['loggedUser'],
    queryFn: () => usersService.me(),
    enabled: signedIn,
    staleTime: Infinity,
  });

  const signIn = useCallback((token: string) => {
    localStorage.setItem(localStorageKeys.TOKEN, token);
    setSignedIn(true);
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(localStorageKeys.TOKEN);
    remove();
    setSignedIn(false);
  }, [remove]);

  useEffect(() => {
    if (isError) {
      toast.error('Session expired');
      signOut();
    }
  }, [isError, signOut]);

  useEffect(() => {
    if (isSuccess && signedIn) {
      serUserLogged(data.user);
    }
  }, [isSuccess, signedIn]);

  return (
    <AuthContext.Provider
      value={{
        signedIn: isSuccess && signedIn,
        userLogged,
        signIn,
        signOut,
      }}
    >
      <LaunchScreen isLoading={isFetching} />
      {!isFetching && children}
    </AuthContext.Provider>
  );
};
