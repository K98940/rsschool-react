import classes from './spinner.module.css';
import imgSpinner from '@assets/icons/spinner.webp';

export default function Spinner() {
  return (
    <div className={classes.spinner}>
      <img
        className={classes.spinnerImg}
        src={imgSpinner}
        width={64}
        height={64}
        alt="loading..."
        data-testid="spinner-img"
      />
    </div>
  );
}
