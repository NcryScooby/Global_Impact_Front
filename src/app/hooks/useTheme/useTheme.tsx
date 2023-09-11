import { ThemeContext } from '@contexts/ThemeContext';
import { ITheme } from '@interfaces/theme/ITheme';
import { useContext } from 'react';

const useTheme = (): ITheme => {
  const context = useContext(ThemeContext) as ITheme;
  return context;
};

export { useTheme };
