import { Component, ReactNode } from 'react';
import classes from './errorBoundary.module.css';

type ErrorBoundaryProps = {
  children?: ReactNode;
};

type State = {
  hasError: boolean;
};

export default class ErrorBoundary extends Component<ErrorBoundaryProps> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(): State {
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
        <div className={classes.errorMessage}>
          <p>Something went wrong</p>
        </div>
      );
    }

    return this.props.children;
  }
}
