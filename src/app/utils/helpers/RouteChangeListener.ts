import { usePreviousRoute } from '@hooks/usePreviousRoute';
import { useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';

export const RouteChangeListener = () => {
  const location = useLocation();
  const { setPreviousRoute } = usePreviousRoute();

  const currentPathRef = useRef(location.pathname);

  useEffect(() => {
    if (currentPathRef.current !== location.pathname) {
      setPreviousRoute(currentPathRef.current);

      currentPathRef.current = location.pathname;
    }
  }, [location.pathname, setPreviousRoute]);

  return null;
};
