import { ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { EpisodeBase } from '@/types/types';
import { useAppDispatch } from '@/hooks/hooks';
import classes from './episodeCheckbox.module.css';
import { addEpisode, isCheckedEpisode, removeEpisode } from '../flyout/flyoutSlice';

type Props = { episode: EpisodeBase };

const EpisodeCheckbox = ({ episode }: Props) => {
  const isChecked = useSelector(isCheckedEpisode(episode.uid));
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
