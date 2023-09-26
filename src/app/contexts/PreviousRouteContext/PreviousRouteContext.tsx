import { ReactNode, createContext, useState, Dispatch, SetStateAction } from 'react';

interface PreviousRouteContextProps {
  previousRoute: string | null;
  setPreviousRoute: Dispatch<SetStateAction<string | null>>;
}

export const PreviousRouteContext = createContext({} as PreviousRouteContextProps);

export const PreviousRouteProvider = ({ children }: { children: ReactNode }) => {
  const [previousRoute, setPreviousRoute] = useState<string | null>(null);

  return (
    <PreviousRouteContext.Provider value={{ previousRoute, setPreviousRoute }}>
      {children}
    </PreviousRouteContext.Provider>
  );
};
