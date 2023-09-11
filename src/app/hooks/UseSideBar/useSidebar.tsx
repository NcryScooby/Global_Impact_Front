import { SidebarContext } from '@contexts/SidebarContext';
import { useContext } from 'react';

export const useSidebar = () => {
  return useContext(SidebarContext);
};
