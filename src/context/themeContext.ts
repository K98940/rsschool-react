import { createContext } from 'react';
import { EpisodeBase } from '@/types/types';

export type Themes = 'light' | 'dark';
export type ThemeContext = {
  theme: Themes;
  toggleTheme: () => void;
  favourites: EpisodeBase[];
  clearEpisodes: () => void;
  removeEpisode: (uid: string) => void;
  addEpisode: (episode: EpisodeBase) => void;
};

const themeContext = createContext<ThemeContext>({} as ThemeContext);

export { themeContext };
