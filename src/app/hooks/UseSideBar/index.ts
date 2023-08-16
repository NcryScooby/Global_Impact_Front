import { SideBarContext } from '../../contexts/SidebarContext';
import { useContext } from 'react';

export const useSideBar = () => {
  return useContext(SideBarContext);
};
