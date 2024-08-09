import classes from './errorComponent.module.css';
import { isRouteErrorResponse } from '@remix-run/react';

export function ErrorComponent(error: unknown) {
  if (isRouteErrorResponse(error)) {
    return (
      <div className={`error ${classes.errorContainer}`} data-testid="error-container">
        <h3 data-testid="error-header">
          {error.status} {error.statusText}
        </h3>
        <p data-testid="error-content">{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div className={`error ${classes.errorContainer}`} data-testid="error-container">
        <h3 data-testid="error-header">Error</h3>
        <p>{error.message}</p>
        <p data-testid="error-content">The stack trace is:</p>
        <pre data-testid="error-stack">{error.stack}</pre>
      </div>
    );
  } else {
    return (
      <h3 className="error" data-testid="error-header">
        Unknown Error
      </h3>
    );
  }
}
