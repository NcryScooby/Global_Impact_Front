import { ReactNode, createContext, useCallback, useState } from 'react';

interface SidebarContextProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const SidebarContext = createContext({} as SidebarContextProps);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState<boolean>(false);

  const setIsOpen = useCallback((isOpen: boolean) => {
    setOpen(isOpen);
  }, []);

  return (
    <SidebarContext.Provider
      value={{
        isOpen: open,
        setIsOpen,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
