import { createContext } from 'react';

export type Themes = 'light' | 'dark';
export type ThemeContext = {
  theme: Themes;
  toggleTheme: () => void;
};

const themeContext = createContext<ThemeContext>({} as ThemeContext);

export { themeContext };
