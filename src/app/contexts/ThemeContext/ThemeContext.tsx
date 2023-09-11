import { createContext, useState, ReactNode, useEffect } from 'react';
import { ITheme } from './../../interfaces/theme/ITheme';
import { localStorageKeys } from '../../config/keys';

const defaultContextData: ITheme = {
  theme: 'dark',
  toggleTheme: () => {},
};

export const ThemeContext = createContext<ITheme>(defaultContextData);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ITheme['theme']>(() => {
    const storedTheme = localStorage.getItem(localStorageKeys.THEME);
    if (storedTheme) {
      return storedTheme as ITheme['theme'];
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    localStorage.setItem(localStorageKeys.THEME, theme);

    if (document.documentElement) {
      document.documentElement.classList.toggle('dark', theme === 'dark');
      document.documentElement.style.backgroundColor = theme === 'dark' ? '#111111' : '#ffffff';
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
