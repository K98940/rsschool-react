import { Component, ReactNode } from 'react';
import classes from './errorBoundary.module.css';
import imgBroken from '@assets/img/broken.webp';

type ErrorBoundaryProps = {
  children?: ReactNode;
};

export default class ErrorBoundary extends Component<ErrorBoundaryProps> {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    console.log('Something terrible has happened. We should do something!');
    return { hasError: true };
  }

  componentDidUpdate(prevProps: Readonly<ErrorBoundaryProps>): void {
    if (this.props.children !== prevProps.children) {
      this.setState({ hasError: false });
    }
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className={classes.boundaryContainer}>
          <h1 className={classes.header}>Something went wrong</h1>
          <img src={imgBroken} alt="Something went wrong" />
          <p className={classes.content}>But we'll fix it soon</p>
        </div>
      );
    }

    return this.props.children;
  }
}
