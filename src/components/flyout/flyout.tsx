'use client';
import { useContext } from 'react';
import classes from './flyout.module.css';
import createCSV from '@/helpers/createCSV';
import saveToFile from '@/helpers/saveToFile';
import { FILE_ENDING } from '@/helpers/constants';
import { themeContext } from '@/context/themeContext';

const Flyout = () => {
  const { favourites, clearEpisodes } = useContext(themeContext);
  const countCheckedEpisodes = favourites.length;

  const handleDownloadList = () => {
    const blob = new Blob(createCSV(favourites), { type: 'text/plain' });
    const fileName = `${favourites.length || ''}${FILE_ENDING}`;
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
          onClick={() => clearEpisodes()}
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
