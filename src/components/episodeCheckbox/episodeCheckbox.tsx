import { ChangeEvent } from 'react';
import classes from './episodeCheckbox.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { checkedEpisode, isCheckedEpisode, uncheckedEpisode } from '@components/episodes/episodesSlice';

type Props = { id: string };

const EpisodeCheckbox = ({ id }: Props) => {
  const isChecked = useSelector(isCheckedEpisode(id));
  const dispatch = useDispatch();

  const handleToggle = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (isChecked) {
      dispatch(uncheckedEpisode(id));
    } else {
      dispatch(checkedEpisode(id));
    }
  };

  return (
    <input
      className={classes.checkboxInput}
      type="checkbox"
      checked={isChecked}
      onChange={(e) => handleToggle(e)}
    ></input>
  );
};

export { EpisodeCheckbox };
