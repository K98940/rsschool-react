import classes from './errorPage.module.css';
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  const errorMessage = getErrorMessage(error);

  return (
    <article className={classes.errorPage}>
      <h1>Error 😟</h1>
      <p>{errorMessage}</p>
    </article>
  );
}

function getErrorMessage(error: unknown): string {
  let message: string;
  if (isRouteErrorResponse(error)) {
    message = `(${error.status}): ${error.data}` || `${error.status}`;
  } else if (error instanceof Error) {
    message = error.message;
  } else if (error instanceof Response) {
    message = error.statusText;
  } else if (typeof error === 'string') {
    message = error;
  } else {
    message = 'Unknown error';
  }

  return message;
}
