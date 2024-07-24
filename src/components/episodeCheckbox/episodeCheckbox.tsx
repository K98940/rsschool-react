import { ChangeEvent } from 'react';
import { EpisodeBase } from '@/types/types';
import classes from './episodeCheckbox.module.css';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { addEpisode, isCheckedEpisode, removeEpisode } from '../flyout/flyoutSlice';

type Props = { episode: EpisodeBase };

const EpisodeCheckbox = ({ episode }: Props) => {
  const isChecked = useAppSelector(isCheckedEpisode(episode.uid));
  const dispatch = useAppDispatch();

  const handleToggle = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (isChecked) {
      dispatch(removeEpisode(episode));
    } else {
      dispatch(addEpisode(episode));
    }
  };

  return (
    <input
      className={classes.checkboxInput}
      type="checkbox"
      checked={isChecked}
      onChange={(e) => handleToggle(e)}
      data-testid="episode-checkbox"
    ></input>
  );
};

export { EpisodeCheckbox };
