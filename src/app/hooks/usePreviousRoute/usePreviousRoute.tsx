import { PreviousRouteContext } from '@contexts/PreviousRouteContext';
import { useContext } from 'react';

export const usePreviousRoute = () => {
  return useContext(PreviousRouteContext);
};
