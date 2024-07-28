import { ReactNode, useState } from 'react';
import { themeContext, Themes } from './themeContext';

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Themes>('light');
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return <themeContext.Provider value={{ theme, toggleTheme }}>{children}</themeContext.Provider>;
};
