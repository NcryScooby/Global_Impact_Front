import type { ITheme } from '@interfaces/theme/ITheme';
import { ThemeContext } from '@contexts/ThemeContext';
import { useContext } from 'react';

const useTheme = (): ITheme => {
  const context = useContext(ThemeContext) as ITheme;
  return context;
};

export { useTheme };
