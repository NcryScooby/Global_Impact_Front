import { createContext, useCallback, useEffect, useState } from 'react';
import { LaunchScreen } from '../../view/components/LaunchScreen';
import { localStorageKeys } from '../config/localStorageKeys';
import { usersService } from '../services/usersService';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

interface AuthContextProps {
  signedIn: boolean;
  userName: string;
  signIn(token: string): void;
  signOut: () => void;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storedToken = localStorage.getItem(localStorageKeys.TOKEN);

    return !!storedToken;
  });

  const [name, setName] = useState<string>('');

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
      setName(data.user.name);
    }
  }, [isSuccess, signedIn]);

  return (
    <AuthContext.Provider
      value={{
        signedIn: isSuccess && signedIn,
        userName: name,
        signIn,
        signOut,
      }}
    >
      <LaunchScreen isLoading={isFetching} />
      {!isFetching && children}
    </AuthContext.Provider>
  );
};
