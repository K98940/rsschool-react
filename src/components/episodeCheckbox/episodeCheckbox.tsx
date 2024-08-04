'use client';
import { useContext } from 'react';
import { EpisodeBase } from '@/types/types';
import classes from './episodeCheckbox.module.css';
import { themeContext } from '@/context/themeContext';

type Props = { episode: EpisodeBase };

const EpisodeCheckbox = ({ episode }: Props) => {
  const { favourites, addEpisode, removeEpisode } = useContext(themeContext);
  const isChecked = Boolean(favourites?.find((favourite) => favourite.uid === episode.uid));

  const handleToggle = () => {
    if (isChecked) {
      removeEpisode(episode.uid);
    } else {
      addEpisode(episode);
    }
  };

  return (
    <input
      className={classes.checkboxInput}
      type="checkbox"
      checked={isChecked}
      onChange={() => handleToggle()}
      data-testid="episode-checkbox"
    ></input>
  );
};

export { EpisodeCheckbox };
