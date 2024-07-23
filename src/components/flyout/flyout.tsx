import classes from './flyout.module.css';
import createCSV from '@/helpers/createCSV';
import saveToFile from '@/helpers/saveToFile';
import { FILE_ENDING } from '@/helpers/constants';
import { useDispatch, useSelector } from 'react-redux';
import { clearList, selectCheckedCount, selectCheckedEpisodes } from './flyoutSlice';

const Flyout = () => {
  const dispatch = useDispatch();
  const countCheckedEpisodes = useSelector(selectCheckedCount);
  const checkedEpisodes = useSelector(selectCheckedEpisodes);

  const handleDownloadList = () => {
    const blob = new Blob(createCSV(checkedEpisodes), { type: 'text/plain' });
    const fileName = `${checkedEpisodes.length || ''}${FILE_ENDING}`;
    saveToFile(blob, fileName);
  };

  return (
    <article
      className={`${classes.flyoutContainer} ${countCheckedEpisodes ? '' : classes.__outOfView}`}
      data-testid="flyout-article"
    >
      <h1 className={classes.flyoutTitle} data-testid="flyout-header">
        ✅ {countCheckedEpisodes} items are selected
      </h1>
      <div className={classes.buttonsContainer}>
        <button
          className={`button ${classes.btnFlyout}  ${classes.btnUnselectAll}`}
          onClick={() => dispatch(clearList())}
          data-testid="flyout-btn-unselectall"
        ></button>
        <button
          className={`button ${classes.btnFlyout}  ${classes.btnDownload}`}
          onClick={handleDownloadList}
          data-testid="flyout-btn-download"
        ></button>
      </div>
    </article>
  );
};

export { Flyout };
