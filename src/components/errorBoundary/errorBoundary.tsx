import { Component, ReactNode } from 'react';
import classes from './errorBoundary.module.css';
import imgBroken from '@assets/img/broken.webp';

type ErrorBoundaryProps = {
  children?: ReactNode;
};

const ERROR_MESSAGE_TITLE = 'Something went wrong';
const ERROR_MESSAGE_BOTTOM = 'But we`ll fix it soon';

export default class ErrorBoundary extends Component<ErrorBoundaryProps> {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error): void {
    console.log(error);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className={classes.boundaryContainer}>
          <h1 className={classes.header}>{ERROR_MESSAGE_TITLE}</h1>
          <img src={imgBroken} alt={ERROR_MESSAGE_TITLE} />
          <p className={classes.content}>{ERROR_MESSAGE_BOTTOM}</p>
        </div>
      );
    }

    return this.props.children;
  }
}
