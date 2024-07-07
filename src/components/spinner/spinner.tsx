import classes from './spinner.module.css';
import { Component, ReactNode } from 'react';
import imgSpinner from '@assets/icons/spinner.webp';

export default class Spinner extends Component {
  render(): ReactNode {
    return (
      <div className={classes.spinner}>
        <img className={classes.spinnerImg} src={imgSpinner} width={64} height={64} alt="loading..." />
      </div>
    );
  }
}
