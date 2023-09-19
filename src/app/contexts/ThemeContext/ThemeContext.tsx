import { createContext, useState, ReactNode, useEffect, useCallback } from 'react';
import type { ITheme } from '@interfaces/theme/ITheme';
import { localStorageKeys } from '@config/keys';

const defaultContextData: ITheme = {
  theme: 'dark',
  toggleTheme: () => {},
  singleTheme: () => {},
};

export const ThemeContext = createContext<ITheme>(defaultContextData);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const getInitialTheme = () => {
    const storedTheme = localStorage.getItem(localStorageKeys.THEME);
    if (storedTheme) return storedTheme as ITheme['theme'];
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  };

  const [theme, setTheme] = useState<ITheme['theme']>(getInitialTheme);

  useEffect(() => {
    localStorage.setItem(localStorageKeys.THEME, theme);

    const rootElement = document.documentElement;
    if (rootElement) {
      rootElement.classList.toggle('dark', theme === 'dark');
      rootElement.style.backgroundColor = theme === 'dark' ? '#111111' : '#ffffff';
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  const singleTheme = useCallback((theme: ITheme['theme']) => {
    setTheme(theme);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, singleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
