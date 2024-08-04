'use client';
import { ReactNode, useState } from 'react';
import { EpisodeBase } from '@/types/types';
import { themeContext, Themes } from './themeContext';

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Themes>('light');
  const [favourites, setFavourites] = useState<EpisodeBase[]>([]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const removeEpisode = (uid: string): void => {
    const newFavourites = favourites.filter((f) => f.uid !== uid);
    setFavourites(newFavourites);
  };

  const addEpisode = (episode: EpisodeBase): void => {
    const newFavourites = [...favourites, episode];
    setFavourites(newFavourites);
  };

  const clearEpisodes = (): void => {
    setFavourites([]);
  };

  return (
    <themeContext.Provider value={{ favourites, theme, toggleTheme, removeEpisode, addEpisode, clearEpisodes }}>
      {children}
    </themeContext.Provider>
  );
};
