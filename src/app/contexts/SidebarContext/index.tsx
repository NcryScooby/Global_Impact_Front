import { createContext, useCallback, useState } from 'react';

interface SideBarContextProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const SideBarContext = createContext({} as SideBarContextProps);

export const SideBarProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState<boolean>(false);

  const setIsOpen = useCallback((isOpen: boolean) => {
    setOpen(isOpen);
  }, []);

  return (
    <SideBarContext.Provider
      value={{
        isOpen: open,
        setIsOpen,
      }}
    >
      {children}
    </SideBarContext.Provider>
  );
};
